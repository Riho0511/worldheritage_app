import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Comments, ShowData } from '../index';


const SelectedMypageItem = (props) => {
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
                        <ImageList sx={{ minWidth: 300, maxWidth: 480, height: 380, bgcolor: 'rgb(50,50,60)', m: '0 auto' }} cols={2} rowHeight={125} className="post_images">
                            {props.heritageImages.map(image => (
                                <ImageListItem key={image.image}>
                                    <img src={`https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/${image.image}`} />
                                </ImageListItem>
                            ))}
                        </ImageList>
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
            {show}
        </div>
    );
};

export default SelectedMypageItem;