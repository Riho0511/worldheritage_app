import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgb(30,30,35)',
        color: 'white',
    },
    white: {
        color: 'white',
        wordWrap: 'break-word'
    },
});


// コメントコンポーネント
const Comments = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const comments = props.page == "heritage" ? [{
        'comment': {
            'id': 0,
            'user_id': 0,
            'rate': 5,
            'comment': '最高だった〜',
            'anonymous': 0,
            'created_at': 'yyyy-mm-dd ',
        },
        'username': 'ダミーさん',
        'avatar': 'no-profile.png'
    }] : [];
    if (props.comments.length != 0) {
        props.comments.forEach(comment => {
            comments.push(comment);
        });
    }
    
    
    // コメント削除
    const deleteComment = async (id) => {
        const data = new FormData();
        data.append("id", id);
        
        await axios
            .post('/api/heritage/' + props.heritageId + '/uncomment', data)
            .then(res => {
                console.log(res.data.two_comments);
                props.setComment(res.data.two_comments);
                props.setCommentCount(res.data.comment_count);
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
        <List sx={{ bgcolor: 'background.paper' }} className={classes.root}>
            {comments.map(comment => {
                return (
                    <React.Fragment key={comment.comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={`https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/${comment.avatar}`} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.comment.anonymous == 1 ? "匿名希望" : comment.username}
                                secondary={
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        className={classes.white}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {comment.comment.comment}
                                        <span className="block">{comment.comment.created_at}</span>
                                        <Rating readOnly size="small" value={comment.comment.rate} />
                                        {props.page != "mypage" && comment.comment.user_id == props.user.id &&
                                            <IconButton onClick={() => deleteComment(comment.comment.id)}>
                                                <DeleteIcon sx={{ color: "#9e9e9e" }} />
                                            </IconButton>
                                        }
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                );
            })}
        </List>
    );
};

export default Comments;