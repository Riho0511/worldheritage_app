import React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

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


const Comment = (props) => {
    const classes = useStyles();
    
    
    return (
        <>
            {props.comments.map(comment => {
                return (
                    <div key={comment.comment}>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src="https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/no-profile.png" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.anonymous == "T" ? "匿名希望" : comment.username}
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
                                        {comment.user_id == props.authId &&
                                            <IconButton onClick={() => props.deleteComment(comment.id)}>
                                                <DeleteIcon sx={{ color: "#9e9e9e" }} />
                                            </IconButton>
                                        }
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </div>
                );
            })}
        </>
    );
};

export default Comment;