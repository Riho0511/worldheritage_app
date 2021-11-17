import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AlertInfo, CheckModal, CountryInformation, Header, HeritageCard } from '../parts/index';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'rgb(40,40,45)',
        height: 40,
        margin: '0 auto 20px',
        maxWidth: 330,
    } 
});

const containerStyle = {
    width: "65%",
    height: "250px",
    margin: "0 auto 10px"
};


const Country = () => {
    const classes = useStyles();
    const history = useHistory();
    const countryId = parseInt(useParams().id);
    const location = useLocation();
    const message = location.state;
    const [authId, setAuthId] = useState(0);
    const [authchecker, setAuthchecker] = useState('');
    const headerMenu = authchecker === 'admin' && {'menu1':false, 'menu2':false, 'menu3':true, 'menu4':true, 'menu5':false, 'check':true};
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState([]);
    const [heritages, setHeritages] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [images, setImages] = useState([]);
    const [niced, setNiced] = useState(false);
    const [collected, setCollected] = useState(false);
    const [heritageCollected, setHeritageCollected] = useState([]);
    const [niceCount, setNiceCount] = useState(0);
    const [collectCount, setCollectCount] = useState(0);
    const [latitude, setLatitude] = useState(0.00);
    const [longitude, setLongitude] = useState(0.00);
    
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/${countryId}`);
            setCountry(res.data.country);
            setHeritages(res.data.heritages);
            setCurrencies(res.data.currencies);
            setImages(res.data.images);
            setAuthId(res.data.auth);
            setHeritageCollected(res.data.heritageCollected);
            setNiceCount(res.data.niceCount);
            setCollectCount(res.data.collectCount);
            setLatitude(res.data.country.latitude);
            setLongitude(res.data.country.longitude);
            
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
    }, [setCountry, setHeritages, setCurrencies, setNiced]);
    
    // 国削除
    const deleted = useCallback(async () => {
        await axios
            .post('/api/country/' + countryId)
            .then(response => {
                history.push({
                    pathname: '/home',
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
            .post('/api/country/' + countryId + '/user/' + authId + '/collect')
            .then(response => {
                setCollected(true);
                const cc = collectCount + 1;
                setCollectCount(cc);
                history.push({
                    pathname: '/country/' + countryId,
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
            .post('/api/country/' + countryId+ '/user/' + authId + '/nocollect')
            .then(response => {
                setCollected(false);
                const cc = collectCount - 1;
                setCollectCount(cc);
                history.push({
                    pathname: '/country/' + countryId,
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
            .post('/api/country/' + countryId + '/user/' + authId + '/nice')
            .then(response => {
                setNiced(true);
                const nc = niceCount + 1;
                setNiceCount(nc);
                history.push({
                    pathname: '/country/' + countryId,
                    state: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    // お気に入り解除
    const unnice = useCallback(async() => {
        await axios
            .post('/api/country/' + countryId + '/user/' + authId + '/unnice')
            .then(response => {
                setNiced(false);
                const nc = niceCount - 1;
                setNiceCount(nc);
                history.push({
                    pathname: '/country/' + countryId,
                    state: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
        
    return (
        <>
            <Header headerMenu={headerMenu} authchecker={authchecker} countryId={countryId} stateId={country.state} />
            
            {/* 国追加通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <h2>{country.name}</h2>
            <div>
                <CountryInformation
                    countryName={country.name}
                    officialName={country.official_name}
                    capital={country.capital}
                    currencies={currencies}
                    timeDifference={country.time_difference}
                    planeMovement={country.plane_movement}
                />
                <LoadScript googleMapsApiKey={process.env.MIX_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{
                            lat: latitude,
                            lng: longitude,
                        }}
                        zoom={country.zoom}
                    >
                    </GoogleMap>
                </LoadScript>
            </div>
            {authchecker === 'guest' ?
                <Stack direction="row" spacing={1} className={classes.root}>
                    <Button 
                        color="warning" 
                        variant={collected ? "contained" : "outlined"} 
                        endIcon={<AirplaneTicketIcon />} 
                        onClick={collected ? () => setCollected(false): () => setCollected(true)}
                    >
                        コレクト
                    </Button>
                    <Button 
                        color="error" 
                        variant={niced ? "contained" : "outlined"} 
                        endIcon={<ThumbUpAltIcon />} 
                        onClick={niced ? () => setNiced(false) : () => setNiced(true)}
                    >
                        お気に入り
                    </Button>
                </Stack>
            :
                <Stack direction="row" spacing={1} className={classes.root}>
                    <Button 
                        color="warning" 
                        variant={collected ? "contained" : "outlined"} 
                        endIcon={<AirplaneTicketIcon />} 
                        onClick={collected ? () => nocollect() : () => collect()}
                    >
                        コレクト
                    </Button>
                    <Button 
                        color="error" 
                        variant={niced ? "contained" : "outlined"} 
                        endIcon={<ThumbUpAltIcon />} 
                        onClick={niced ? () => unnice() : () => nice()}
                    >
                        お気に入り
                    </Button>
                </Stack>
            }
            <p className="count">「コレクト」{collectCount}件 「お気に入り」{niceCount}件</p>
            <div className="images-list">
                {images.length == 0 ?
                    <Paper className={classes.paper} elevation={5}><p className="noting-data">登録されている世界遺産はありません</p></Paper>
                :
                    <div className="image-split">
                        {images.map((image, index) => {
                            return (
                                <HeritageCard 
                                    key={image.id} 
                                    image={image.image} 
                                    heritageName={heritages[index].name} 
                                    collected={heritageCollected.includes(image.heritage_id)}
                                    countryId={countryId} 
                                    heritageId={heritages[index].id} 
                                />
                            );
                        })}
                    </div>
                }
            </div>
            <CheckModal open={open} handleClose={handleClose} deleted={deleted} />
            <footer>
                <Stack direction="row" spacing={2} className={classes.root}>
                    <Button variant="outlined" component={Link} to={`/country/state/${country.state}`}>国を選ぶ</Button>
                    <Button variant="outlined" component={Link} to="/home">州を選ぶ</Button>
                </Stack>
                {authchecker === 'admin' && 
                    <div className="mt15">
                        <Button onClick={() => handleOpen()} variant="contained" color="error">削除</Button>
                    </div>
                }
            </footer>
        </>
    );
};

export default Country;
