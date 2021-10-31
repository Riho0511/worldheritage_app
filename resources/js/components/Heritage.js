import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { AlertInfo, CheckModal, Header, HeritageInformation, SwiperImages } from '../parts/index'; 

const useStyles = makeStyles({
   root: {
       justifyContent: 'center',
   } 
});


const Heritage = () => {
    const classes = useStyles();
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
    const [country, setCountry] = useState([]);
    const [heritage, setHeritage] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [images, setImages] = useState([]);
    const [stateId, setStateId] = useState('');
    const [niced, setNiced] = useState(false);
    const [collected, setCollected] = useState(false);
    
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/${countryId}/heritage/${heritageId}`);
            setCountry(res.data.country);
            setHeritage(res.data.heritage);
            setCurrency(res.data.currency);
            setImages(res.data.images);
            setAuthId(res.data.auth);
            setStateId(res.data.state);
            
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
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data,
                });
                setCollected(true);
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
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data,
                });
                setCollected(false);
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
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data,
                });
                setNiced(true);
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
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data,
                });
                setNiced(false);
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
                    </div>
                    <div className="heritage-info">
                        <HeritageInformation 
                            heritageName={heritage.name}
                            countryName={country.name}
                            entranceFee={heritage.entrance_fee}
                            unit={currency.unit}
                        />
                        {authchecker === 'guest' ? 
                            <Button color="error" variant={niced ? "contained" : "outlined"} endIcon={<ThumbUpAltIcon />} onClick={niced ? () => setNiced(false) : () => setNiced(true)}>お気に入り</Button>
                        :
                            <Stack direction="row" spacing={1} className={classes.root}>
                                <Button color="warning" variant={collected ? "contained" : "outlined"} endIcon={<AirplaneTicketIcon />} onClick={collected ? () => nocollect() : () => collect()}>コレクト</Button>
                                <Button color="error" variant={niced ? "contained" : "outlined"} endIcon={<ThumbUpAltIcon />} onClick={niced ? () => unnice() : () => nice()}>お気に入り</Button>
                            </Stack>
                        }
                    </div>
                </div>
            </div>
            <CheckModal open={open} handleClose={handleClose} deleted={deleted} />
            <footer className="mt15">
                <div className="ml15">
                    <Stack direction="row" spacing={3} className={classes.root}>
                        <Button variant="outlined" component={Link} to={`/country/${countryId}`}>国情報</Button>
                        <Button variant="outlined" component={Link} to={`/country/state/${stateId}`}>国を選ぶ</Button>
                        <Button variant="outlined" component={Link} to="/">州を選ぶ</Button>
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