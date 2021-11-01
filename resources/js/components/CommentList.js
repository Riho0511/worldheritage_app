import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { AlertInfo, Comment, Header } from '../parts/index';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgb(30,30,35)',
        color: 'white',
    },
    white: {
        color: 'white',
    },
});


const CommentList = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const message = location.state;
    const { url } = useRouteMatch();
    const countryId = parseInt(url.split('/')[2]);
    const heritageId = parseInt(url.split('/')[4]);
    const [authId, setAuthId] = useState(0);
    const [authchecker, setAuthchecker] = useState('');
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':false};
    const [comments, setComments] = useState([]);
    const [commentUsername, setCommentUsername] = useState([]);
    const [commentAvatar, setCommentAvatar] = useState([]);
    
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/${countryId}/heritage/${heritageId}`);
            setAuthId(res.data.auth);
            setComments(res.data.comments);
            setCommentUsername(res.data.commentsUsername);
            setCommentAvatar(res.data.commentsAvatar);
            
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
    
    // コメント削除
    const deleteComment = useCallback(async (id) => {
        const data = new FormData();
        data.append("id", id);
        
        await axios
            .post('/api/heritage/' + heritageId + '/user/' + authId + '/comment/delete', data)
            .then(response => {
                setComments(response.data.comments);
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId + '/comments',
                    state: response.data.message,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    
    return (
        <div>
            <Header headerMenu={headerMenu} authchecker={authchecker} />
            
             {/* 国追加通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <div className="comment_field">
                <List sx={{ bgcolor: 'background.paper' }} className={classes.root}>
                    <Comment comments={comments} username={commentUsername} avatar={commentAvatar} authId={authId} deleteComment={deleteComment} />
                </List>
            </div>
            <footer>
                <Button variant="outlined" component={Link} to={`/country/${countryId}/heritage/${heritageId}`}>戻る</Button>
            </footer>
        </div>
    );
};

export default CommentList;