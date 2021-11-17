import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { AlertInfo, Header, MyCard } from '../parts/index';

const useStyles = makeStyles({
    white: {
        color: 'white',
        wordWrap: 'break-word'
    },
});


const Mypage = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const message = location.state;
    const [user, setUser] = useState('');
    const [authchecker, setAuthchecker] = useState('');
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':false};
    const [collectCountries, setCollectCountries] = useState([]);
    const [collectHeritages, setCollectHeritages] = useState([]);
    const [niceCountries, setNiceCountries] = useState([]);
    const [niceHeritages, setNiceHeritages] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentsHeritage, setCommentsHeritage] = useState([]);
    const [images, setImages] = useState([]);
    
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/mypage');
            setUser(res.data.user);
            setCollectCountries(res.data.collectCountries);
            setCollectHeritages(res.data.collectHeritages);
            setNiceCountries(res.data.niceCountries);
            setNiceHeritages(res.data.niceHeritages);
            setComments(res.data.comments);
            setCommentsHeritage(res.data.commentsHeritages);
            setImages(res.data.images);
            
            switch (res.data.auth) {
                case null:
                    setAuthchecker('guest');
                    break;
                case 1:
                    setAuthchecker('admin');
                    break;
                default:
                    setAuthchecker('user');
                    break;
            }
        };
        
        getData();
    }, []);
    
    
    return (
        <>
            <Header headerMenu={headerMenu} authchecker={authchecker} />
            
            {/* 削除通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <div className="mypage">
                <Avatar src={"https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/" + user.image} sx={{ m: '0 auto', width: 70, height: 70 }} />
                <p>{user.name}</p>
                <div className="card-split">
                    <MyCard type="collect" genre="国" data={collectCountries} />
                    <MyCard type="collect" genre="世界遺産" data={collectHeritages} />
                    <MyCard type="nice" genre="国" data={niceCountries} />
                    <MyCard type="nice" genre="世界遺産" data={niceHeritages} />
                </div>
                <Button variant="outlined" component={Link} to="/mypage/edit">ユーザー編集</Button>
                <div className="comments_images">
                    <div>
                        <p>コメント一覧</p>
                        <List sx={{ width: 220, height: 366, bgcolor: 'rgb(50,50,60)', m: '0 auto' }} className="post_comments">
                            {comments.map((comment, index) => {
                                return (
                                    <div key={comment.comment}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary={commentsHeritage[index]}
                                                secondary={
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        className={classes.white}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {comment.comment}
                                                        <span className="block">{comment.created_at.split(' ')[0]}</span>
                                                        <Rating readOnly size="small" value={comment.rate} />
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    </div>
                                );
                            })}
                        </List>
                    </div>
                    <div>
                        <p>投稿画像</p>
                        <ImageList sx={{ width: 220, height: 380, bgcolor: 'rgb(50,50,60)', m: '0 auto' }} cols={2} rowHeight={125} className="post_images">
                            {images.map((image) => (
                                <ImageListItem key={image.image}>
                                    <img  src={`https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/${image.image}`} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </div>
            </div>
            <footer className="buttons">
                <Button variant="outlined" component={Link} to="/home">戻る</Button>
            </footer>
        </>
    );
};

export default Mypage;