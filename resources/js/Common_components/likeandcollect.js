import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center',
    },
});


// お気に入り・コレクトボタンコンポーネント
const Likeandcollect = (props) => {
    const classes = useStyles();
    const history = useHistory();
    let path; // ページ遷移先のパス
    let countryId, heritageId; // id
    let collectClick, likeClick; // click処理
    let postCollect, postUncollect;
    let postLike, postUnlike;
    
    // onclick, api処理
    if (Object.keys(props.user).length != 0) { // ゲスト以外
        collectClick = props.collected ? () => uncollect() : () => collect();
        likeClick = props.liked ? () => unlike() : () => like();
        
        if (props.type == "country") {  // 国
            countryId = props.countryId;
            path = '/country/' + countryId;
            postCollect = '/api/country/' + countryId + '/collect';
            postUncollect = '/api/country/' + countryId + '/uncollect';
            postLike = '/api/country/' + countryId + '/like';
            postUnlike = '/api/country/' + countryId + '/unlike';
        } else if (props.type == "heritage") { // 世界遺産
            countryId = props.countryId;
            heritageId = props.heritageId;
            path = '/country/' + countryId + '/heritage/' + heritageId;
            postCollect = '/api/heritage/' + heritageId + '/collect';
            postUncollect = '/api/heritage/' + heritageId + '/uncollect';
            postLike = '/api/heritage/' + heritageId + '/like';
            postUnlike = '/api/heritage/' + heritageId + '/unlike';
        }
        
    } else { // ゲスト
        collectClick = () => toggleCollect(props.collected);
        likeClick = () => toggleLike(props.liked);
    }
    
    // お気に入りボタン（ゲスト用）
    const toggleLike = (like) => {
        props.setLiked(!like);
    };
    
    // コレクトボタン（ゲスト用）
    const toggleCollect = (collect) => {
        props.setCollected(!collect);
    };
    
    // 行ったことある
    const collect = async () => {
        await axios
            .post(postCollect)
            .then(res => {
                props.setCollected(true);
                props.setCollectCount(res.data.collect_count);
                history.push({
                    pathname: path,
                    state: res.data.message,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    // 行ったことがない
    const uncollect = async () => {
        await axios
            .post(postUncollect)
            .then(res => {
                props.setCollected(false);
                props.setCollectCount(res.data.collect_count);
                history.push({
                    pathname: path,
                    state: res.data.message,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    // お気に入り登録
    const like = async () => {
        await axios
            .post(postLike)
            .then(res => {
                props.setLiked(true);
                props.setLikeCount(res.data.like_count);
                history.push({
                    pathname: path,
                    state: res.data.message,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    // お気に入り解除
    const unlike = async () => {
        await axios
            .post(postUnlike)
            .then(res => {
                props.setLiked(false);
                props.setLikeCount(res.data.like_count);
                history.push({
                    pathname: path,
                    state: res.data.message,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    
    
    return (
        <React.Fragment>
            <Stack direction="row" spacing={1} className={classes.root}>
                <Button 
                    color="warning" 
                    variant={props.collected ? "contained" : "outlined"} 
                    endIcon={<AirplaneTicketIcon />} 
                    onClick={collectClick}
                >
                    コレクト
                </Button>
                <Button 
                    color="error" 
                    variant={props.liked ? "contained" : "outlined"} 
                    endIcon={<ThumbUpAltIcon />} 
                    onClick={likeClick}
                >
                    お気に入り
                </Button>
            </Stack>
            <p className="count">「コレクト」{props.collectCount}件 「お気に入り」{props.likeCount}件</p>
        </React.Fragment>
    );
};

export default Likeandcollect;