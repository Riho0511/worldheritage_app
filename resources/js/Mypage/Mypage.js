import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { useLocation } from 'react-router-dom';
import { AlertInfo, MyCard, MypageOperations, Operations, SelectedMypageItem, UpBar } from '../index';
import { LoginUser } from '../Router';


// マイページ
const Mypage = () => {
    const location = useLocation();
    const message = location.state;
    const user = useContext(LoginUser);
    const [open, setOpen] = useState(false);
    const [collectCountries, setCollectCountries] = useState([]); // コレクトしている国
    const [collectHeritages, setCollectHeritages] = useState([]); // コレクトしている世界遺産
    const [likeCountries, setLikeCountries] = useState([]); // お気に入りしている国
    const [likeHeritages, setLikeHeritages] = useState([]); // お気に入りしている世界遺産
    const [comments, setComments] = useState([]); // 投稿したコメント
    const [heritageImages, setHeritageImages] = useState([]); // 投稿した世界遺産画像
    const [state, setState] = useState(5);
    
    
    const toggleDrawer = useCallback((open) => () => {
        setOpen(open);
    });
    
    useEffect(() => {
        const getData = async () => {
            await axios
                .get('/api/mypage')
                .then(res => {
                    setLikeCountries(res.data.like_countries);
                    setLikeHeritages(res.data.like_heritages);
                    setCollectCountries(res.data.collect_countries);
                    setCollectHeritages(res.data.collect_heritages);
                    setComments(res.data.comments);
                    setHeritageImages(res.data.images);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        
        getData();
    }, []);
    
    
    return (
        <React.Fragment>
            <UpBar page="mypage" toggleDrawer={toggleDrawer} />
            {/* 削除通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <div className="mypage">
                <Avatar src={"https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/" + user.image} sx={{ m: '0 auto', width: 70, height: 70 }} />
                <p>{user.name}</p>
                <div className="card-split">
                    <MyCard type="collect" genre="国" data={collectCountries.length} />
                    <MyCard type="collect" genre="世界遺産" data={collectHeritages.length} />
                    <MyCard type="nice" genre="国" data={likeCountries.length} />
                    <MyCard type="nice" genre="世界遺産" data={likeHeritages.length} />
                </div>
                <Operations page="mypageEdit" />
                <SelectedMypageItem 
                    collectCountries={collectCountries} collectHeritages={collectHeritages}
                    likeCountries={likeCountries} likeHeritages={likeHeritages}
                    comments={comments} heritageImages={heritageImages} user={user} state={state}
                />
                {open && <MypageOperations open={open} toggleDrawer={toggleDrawer} setState={setState} />}
            </div>
            <Operations page="mypage" />
        </React.Fragment>
    );
};

export default Mypage;