import React, { useState, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgb(50,50,55)',
        height: 90,
    },
});


const PostComment = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [rate, setRate] = useState(5);
    const [anonymous, setAnonymous] = useState(false);
    const [text, setText] = useState('');
    
    
    // コメント入力
    const inputComment = (e) => {
        setText(e.target.value);
    }
    
    // 匿名送信チェック
    const checked = () => {
        let check = anonymous ? false : true;
        setAnonymous(check);
    }
    
    // コメント投稿
    const comment = useCallback(async (text, rate, anonymous, authId) => {
        // コメントがない場合は実行しない
        if (text.length == 0) {
            return;
        }
        
        const data = new FormData();
        data.append("heritage_id", props.heritageId);
        data.append("rate", rate);
        data.append("comment", text);
        if (anonymous) {
            data.append("anonymous", "T");
        } else {
            data.append("anonymous", "F");
        }
        
        await axios
            .post('/api/heritage/' + props.heritageId + '/user/' + authId + '/comment', data)
            .then(response => {
                setRate(1);
                setAnonymous(false);
                setText('');
                props.setCommentOpen(false);
                let array1 = props.comments;
                array1.unshift(response.data.comment);
                props.setComments(array1);
                let array2 = props.twoComments;
                const com = {
                    id: response.data.comment.id,
                    heritage_id: parseInt(response.data.comment.heritage_id),
                    user_id: parseInt(response.data.comment.user_id),
                    username: response.data.comment.username,
                    rate: parseInt(response.data.comment.rate),
                    comment: response.data.comment.comment,
                    anonymous: response.data.comment.anonymous,
                    created_at: response.data.comment.created_at,
                    updated_at: response.data.comment.updated_at
                }
                if (array2.length == 2) {
                    array2.pop();
                }
                array2.unshift(com);
                props.setTwoComments(array2);
                let array3 = props.username;
                array3.unshift(response.data.username);
                props.setUsername(array3);
                let array4 = props.avatar;
                array4.unshift(response.data.avatar);
                props.setAvatar(array4);
                history.push({
                    pathname: '/country/' + props.countryId + '/heritage/' + props.heritageId,
                    state: response.data.message,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [props.setComments, props.setTwoComments]);
    
    
    return (
        <div className="comment">
            <Paper variant="outlined" className={classes.root}>
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                    <InputBase sx={{ ml: 2, flex: 1 }} placeholder="comment" value={text} onChange={inputComment} />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} onClick={() => comment(text, rate, anonymous, props.authId)}>
                        <SendIcon />
                    </IconButton>
                </Paper>
                <IconButton sx={{ p: '10px', mr:5, color: 'rgb(255,255,255)' }} onClick={() => props.setCommentOpen(false)}>
                    <CloseFullscreenIcon />
                </IconButton>
                <Rating name="simple-controlled" size="large" value={rate} onChange={(event, newValue) => {setRate(newValue);}} />
                <div className="anonymous">
                    <FormControlLabel control={<Checkbox value={anonymous} size="small" onChange={checked} />} label="匿名送信" />
                </div>
            </Paper>
        </div>
    );
};

export default PostComment;