import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Button from '@mui/material/Button';
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


// コメント投稿コンポーネント
const PostComment = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [rate, setRate] = useState(5);
    const [anonymous, setAnonymous] = useState(false);
    const [text, setText] = useState('');
    const [commentOpen, setCommentOpen] = useState(false);
    let show;
    
    
    if (Object.keys(props.user).length != 0) {
        if (commentOpen) {
            show = (
                <div className="comment">
                    <Paper variant="outlined" className={classes.root}>
                        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="comment" value={text} onChange={(e) => inputComment(e)} />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color="primary" sx={{ p: '10px' }} onClick={() => comment(text, rate, anonymous)}>
                                <SendIcon />
                            </IconButton>
                        </Paper>
                        <IconButton sx={{ pb: '10px', pt: '5px', pr: '10px', pl: '3px', mr: 5, color: 'rgb(255,255,255)' }} onClick={() => setCommentOpen(false)}>
                            <CloseFullscreenIcon />
                        </IconButton>
                        <Rating name="simple-controlled" size="large" value={rate} onChange={(event, newValue) => {setRate(newValue);}} />
                        <div className="anonymous">
                            <FormControlLabel control={<Checkbox value={anonymous} size="small" onChange={() => checked(anonymous)} />} label="匿名送信" />
                        </div>
                    </Paper>
                </div>
            );
        } else {
            show = (<Button variant="outlined" startIcon={<AddCommentIcon />} onClick={() => setCommentOpen(true)}>コメント投稿</Button>);
        }
    }
    
    // コメント入力
    const inputComment = (e) => {
        setText(e.target.value);
    };
    
    // 匿名送信チェック
    const checked = (anonymous) => {
        let check = anonymous ? false : true;
        setAnonymous(check);
    };
    
    // コメント投稿
    const comment = async (text, rate, anonymous) => {
        // コメントがない場合は実行しない
        if (text.length == 0) {
            return;
        }
        
        const data = new FormData();
        const anony = anonymous ? 1 : 0;
        data.append("rate", rate);
        data.append("comment", text);
        data.append("anonymous", anony);
        
        await axios
            .post('/api/heritage/' + props.heritageId + '/comment', data)
            .then(res => {
                setRate(1);
                setAnonymous(false);
                setText('');
                setCommentOpen(false);
                props.setCommentCount(res.data.comment_count);
                props.setTwoComments(res.data.two_comments);
                history.push({
                    pathname: '/country/' + props.countryId + '/heritage/' + props.heritageId,
                    state: res.data.message,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    
    return (
        <React.Fragment>
            {show}
        </React.Fragment>
    );
};

export default PostComment;