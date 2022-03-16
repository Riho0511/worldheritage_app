import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { CheckModal, Comments, MypageImages, ShowData } from '../index';


const SelectedMypageItem = (props) => {
    const history = useHistory();
    const [deleteImages, setDeleteImages] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    
    // 画像削除
    const deleteImage = useCallback(async () => {
        handleClose();
        // 削除する写真がなければ実行しない
        if (deleteImages.length == 0) {
            return;
        }
        
        const data = new FormData();
        data.append("images", deleteImages);
        
        await axios
            .post('/api/images/delete', data)
            .then(res => {
                setDeleteImages([]);
                props.setHeritageImages(res.data.images);
                history.push({
                    pathname: '/mypage',
                    state: res.data.message,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    let show;
    switch (parseInt(props.state)) {
        case 0:
            show = (
                <React.Fragment>
                    <h3>お気に入り(国)</h3>
                    <p>{props.likeCountries.length}件</p>
                    <ShowData data={props.likeCountries} />
                </React.Fragment>
            );
            break;
        case 1:
            show = (
                <React.Fragment>
                    <h3>お気に入り(世界遺産)</h3>
                    <p>{props.likeHeritages.length}件</p>
                    <ShowData data={props.likeHeritages} />
                </React.Fragment>
            );
            break;
        case 2:
            show = (
                <React.Fragment>
                    <h3>コレクト(国)</h3>
                    <p>{props.collectCountries.length}件</p>
                    <ShowData data={props.collectCountries} />
                </React.Fragment>
            );
            break;
        case 3:
            show = (
                <React.Fragment>
                    <h3>コレクト(世界遺産)</h3>
                    <p>{props.collectHeritages.length}件</p>
                    <ShowData data={props.collectHeritages} />
                </React.Fragment>
            );
            break;
        case 4:
            show = (
                <div className="post_comments">
                    <h3>投稿コメント</h3>
                    <p>{props.comments.length}件</p>
                    <Comments className="post_comments" comments={props.comments} user={props.user} page="mypage" />
                </div>
            );
            break;
        case 5:
            show = (
                <React.Fragment>
                    <h3>投稿画像</h3>
                    <p>{props.heritageImages.length}件</p>
                    {props.heritageImages.length > 0 &&
                        <MypageImages handleOpen={handleOpen} heritageImages={props.heritageImages} deleteImages={deleteImages} setDeleteImages={setDeleteImages} />
                    }
                </React.Fragment>
            );
            break;
        case 6:
            show = (<h3>お問い合わせ</h3>);
            break;
    }


    return (
        <div className="mypage_info">
            <CheckModal open={open} handleClose={handleClose} deleted={deleteImage} />
            {show}
        </div>
    );
};

export default SelectedMypageItem;