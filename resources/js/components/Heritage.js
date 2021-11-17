import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { makeStyles } from '@mui/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import NearMeIcon from '@mui/icons-material/NearMe';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Typography from '@mui/material/Typography';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { AlertInfo, CheckModal, Comment, Header, HeritageInformation, PostComment, SwiperImages } from '../parts/index';

const useStyles = makeStyles({
    root: {
       justifyContent: 'center',
    },
    right: {
        justifyContent: 'end'
    }
});

const useStyles1 = makeStyles({
    root: {
        backgroundColor: 'rgb(30,30,35)',
        color: 'white',
    },
    white: {
        color: 'white',
    },
});

const containerStyle = {
  width: "65%",
  height: "230px",
  margin: "0 auto 10px"
};

const Input = styled('input')({
  display: 'none',
});


const Heritage = () => {
    const classes = useStyles();
    const classes1 = useStyles1();
    const history = useHistory();
    const { url } = useRouteMatch();
    const countryId = parseInt(url.split('/')[2]);
    const heritageId = parseInt(url.split('/')[4]);
    const location = useLocation();
    const message = location.state;
    const [authId, setAuthId] = useState(0);
    const [authchecker, setAuthchecker] = useState('');
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':true, 'check':true};
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const [country, setCountry] = useState([]);
    const [heritage, setHeritage] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [images, setImages] = useState([]);
    const [postImages, setPostImages] = useState([]);
    const [stateId, setStateId] = useState('');
    const [niced, setNiced] = useState(false);
    const [collected, setCollected] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentUsername, setCommentUsername] = useState([]);
    const [commentAvatar, setCommentAvatar] = useState([]);
    const [twoComments, setTwoComments] = useState([]);
    const [niceCount, setNiceCount] = useState(0);
    const [collectCount, setCollectCount] = useState(0);
    const [latitude, setLatitude] = useState(0.00);
    const [longitude, setLongitude] = useState(0.00);

    
    // 写真選択
    const selectImages = (e) => {
        const filesList = e.target.files;
        let imgs = [];
        for (let i=0; i < filesList.length; i++) {
            imgs.push(filesList[i]);
        }
        setPostImages(imgs);
    };
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/${countryId}/heritage/${heritageId}`);
            setCountry(res.data.country);
            setHeritage(res.data.heritage);
            setCurrency(res.data.currency);
            setImages(res.data.images);
            setAuthId(res.data.auth);
            setStateId(res.data.state);
            setComments(res.data.comments);
            setNiceCount(res.data.niceCount);
            setCollectCount(res.data.collectCount);
            setCommentUsername(res.data.commentsUsername);
            setCommentAvatar(res.data.commentsAvatar);
            setLatitude(res.data.heritage.latitude);
            setLongitude(res.data.heritage.longitude);
            
            let array = [];
            for (let i=0; i<2; i++) {
                if (res.data.comments[i] !== undefined) {
                    array.push(res.data.comments[i]);
                }
            }
            setTwoComments(array);
            
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
            
            if (res.data.niced === null) {
                setNiced(false);
            } else {
                setNiced(true);
            }
            
            if (res.data.collected === null) {
                setCollected(false);
            } else {
                setCollected(true);
            }
        };
        
        getData();
    }, []);
    
    // 世界遺産削除
    const deleted = useCallback(async () => {
        await axios
            .post('/api/country/' + countryId + '/heritage/' + heritageId)
            .then(response => {
                history.push({
                    pathname: '/country/' + countryId,
                    state: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    // 行ったことある
    const collect = useCallback(async () => {
        await axios
            .post('/api/heritage/' + heritageId + '/user/' + authId + '/collect')
            .then(response => {
                setCollected(true);
                const cc = collectCount + 1;
                setCollectCount(cc);
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    // 行ったことがない
    const nocollect = useCallback(async () => {
        await axios
            .post('/api/heritage/' + heritageId + '/user/' + authId + '/nocollect')
            .then(response => {
                setCollected(false);
                const cc = collectCount - 1;
                setCollectCount(cc);
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    // お気に入り登録
    const nice = useCallback(async () => {
        await axios
            .post('/api/heritage/' + heritageId + '/user/' + authId + '/nice')
            .then(response => {
                setNiced(true);
                const nc = niceCount + 1;
                setNiceCount(nc);
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    // お気に入り解除
    const unnice = useCallback(async () => {
        await axios
            .post('/api/heritage/' + heritageId + '/user/' + authId + '/unnice')
            .then(response => {
                setNiced(false);
                const nc = niceCount - 1;
                setNiceCount(nc);
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    // コメント削除
    const deleteComment = useCallback(async (id) => {
        const data = new FormData();
        data.append("id", id);
        
        await axios
            .post('/api/heritage/' + heritageId + '/user/' + authId + '/comment/delete', data)
            .then(response => {
                setTwoComments(response.data.twoComments);
                setComments(response.data.comments);
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data.message,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    // 画像投稿
    const imagesPost = useCallback(async (images) => {
        
        // 投稿画像がない場合は送信しない
        if (images.length == 0) {
            return;
        }
        
        const data = new FormData();
        images.forEach((file, index) => {
            data.append('images[' + index + ']', file);
        });
        const headers = { "content-type": "multipart/form-data" };
        
        await axios
            .post('/api/heritage/' + heritageId + '/user/' + authId + '/images', data, { headers })
            .then(response => {
                const images = response.data.images;
                setImages(images);
                setPostImages([]);
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data.message,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
        
    return (
        <>
            <Header headerMenu={headerMenu} authchecker={authchecker} countryId={countryId} heritageId={heritageId} />
            
            {/* 国追加通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <div className='heritage_information'>
                <div className="split">
                    <div className="images">
                        <SwiperImages images={images} />
                        <Stack direction="row" spacing={1} className={classes.right}>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" multiple onChange={selectImages} />
                                <IconButton color={postImages.length > 0 ? "inherit" : "primary"} component="span">
                                    <AddAPhotoIcon />
                                </IconButton>
                            </label>
                            <Button variant="outlined" disabled={postImages.length > 0 ? false : true} startIcon={<NearMeIcon />} size="small" onClick={() => imagesPost(postImages)}>投稿</Button>
                        </Stack>
                    </div>
                    <div className="heritage-info">
                        <div>
                        <HeritageInformation
                            heritageName={heritage.name} countryName={country.name}
                            entranceFee={heritage.entrance_fee} unit={currency.unit}
                        />
                        {authchecker === 'guest' ? 
                            <Stack direction="row" spacing={1} className={classes.root}>
                                <Button color="warning" variant={collected ? "contained" : "outlined"} endIcon={<AirplaneTicketIcon />} onClick={collected ? () => setCollected(false): () => setCollected(true)}>コレクト</Button>
                                <Button color="error" variant={niced ? "contained" : "outlined"} endIcon={<ThumbUpAltIcon />} onClick={niced ? () => setNiced(false) : () => setNiced(true)}>お気に入り</Button>
                            </Stack>
                        :
                            <Stack direction="row" spacing={1} className={classes.root}>
                                <Button color="warning" variant={collected ? "contained" : "outlined"} endIcon={<AirplaneTicketIcon />} onClick={collected ? () => nocollect() : () => collect()}>コレクト</Button>
                                <Button color="error" variant={niced ? "contained" : "outlined"} endIcon={<ThumbUpAltIcon />} onClick={niced ? () => unnice() : () => nice()}>お気に入り</Button>
                            </Stack>
                        }
                        <p className="count">「コレクト」{collectCount}件 「お気に入り」{niceCount}件</p>
                        </div>
                        <div>
                            <LoadScript googleMapsApiKey={process.env.MIX_GOOGLE_MAPS_API_KEY}>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={{
                                        lat: latitude,
                                        lng: longitude,
                                    }}
                                    zoom={heritage.zoom}
                                >
                                    <Marker 
                                        position={{
                                            lat: latitude,
                                            lng: longitude,
                                        }}
                                    />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                </div>
                <div className="comment_field">
                    <div className="comments">
                        <List sx={{ bgcolor: 'background.paper' }} className={classes1.root}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar src="https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/no-profile.png" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary='ダミー投稿'
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            className={classes1.white}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            最高だった〜！
                                            <span className="block">yyyy-mm-dd</span>
                                            <Rating readOnly size="small" value={5} />
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {twoComments[0] !== undefined &&
                                <Comment comments={twoComments} username={commentUsername} avatar={commentAvatar} authId={authId} deleteComment={deleteComment} />
                            }
                        </List>
                    </div>
                    {comments.length > 2 &&
                        <Link to={`/country/${countryId}/heritage/${heritageId}/comments`} className="count">コメント{comments.length}件をすべて見る</Link>
                    }
                    {commentOpen ? 
                        <PostComment
                            countryId={countryId} heritageId={heritageId} authId={authId}
                            comments={comments} setComments={setComments} setCommentOpen={setCommentOpen}
                            twoComments={twoComments} setTwoComments={setTwoComments} setCommentOpen={setCommentOpen}
                            username={commentUsername} setUsername={setCommentUsername}
                            avatar={commentAvatar} setAvatar={setCommentAvatar}
                        />
                    :
                        authchecker !== 'guest' && <Button variant="outlined" startIcon={<AddCommentIcon />} onClick={() => setCommentOpen(true)}>コメント投稿</Button>
                    }
                </div>
            </div>
            <CheckModal open={open} handleClose={handleClose} deleted={deleted} />
            <footer className="mt15">
                <div className="ml15">
                    <Stack direction="row" spacing={3} className={classes.root}>
                        <Button variant="outlined" component={Link} to={`/country/${countryId}`}>国情報</Button>
                        <Button variant="outlined" component={Link} to={`/country/state/${stateId}`}>国を選ぶ</Button>
                        <Button variant="outlined" component={Link} to="/home">州を選ぶ</Button>
                    </Stack>
                </div>
                {authchecker === 'admin' && 
                    <div className="mt15">
                        <Button onClick={() => handleOpen()} variant="contained" color="error">削除</Button>
                    </div>
                }
            </footer>
        </>
    );
};

export default Heritage;
