import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { AlertInfo, CheckModal, CountryInformation, Header, HeritageCard } from '../parts/index';

const useStyles = makeStyles({
   root: {
       justifyContent: 'center',
   } 
});


const Country = () => {
    const classes = useStyles();
    const history = useHistory();
    const countryId = parseInt(useParams().id);
    const location = useLocation();
    const message = location.state;
    const [authId, setAuthId] = useState(0);
    const headerMenu = authId !== 1 ? {'menu1':false, 'menu2':false, 'menu3':true, 'menu4':true, 'menu5':false}
                                    : {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false};
    const headerAuth = authId !== 1 ? true : false;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState([]);
    const [heritages, setHeritages] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [images, setImages] = useState([]);
    
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/${countryId}`);
            setCountry(res.data.country);
            setHeritages(res.data.heritages);
            setCurrencies(res.data.currencies);
            setImages(res.data.images);
            setAuthId(res.data.auth);
        };
        
        getData();
    }, [setCountry, setHeritages, setCurrencies]);
    
    // 国削除
    const deleted = useCallback(async () => {
        await axios
            .post('/api/country/' + countryId)
            .then(response => {
                history.push({
                    pathname: '/',
                    state: response.data,
                });
            })
            .catch(error => {
                console.log(error)
            });
    });
        
        
    return (
        <>
            <Header headerMenu={headerMenu} headerAuth={headerAuth} countryId={countryId} stateId={country.state} />
            
            {/* 国追加通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <h2>{country.name}</h2>
            <CountryInformation
                officialName={country.official_name}
                capital={country.capital}
                currencies={currencies}
                timeDifference={country.time_difference}
                planeMovement={country.plane_movement}
            />
            <div className="images-list">
                {images.length === 0 ?
                    <Paper className="noting-data" elevation={5}><p>登録されている世界遺産はありません。</p></Paper>
                :
                    <div className="image-split">
                        {images.map((image, index) => {
                            return (
                                <HeritageCard 
                                    key={image.id} 
                                    image={image.image} 
                                    heritageName={heritages[index].name} 
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
                    <Button variant="outlined" component={Link} to="/">州を選ぶ</Button>
                </Stack>
                {headerAuth && 
                    <div className="mt15">
                        <Button onClick={() => handleOpen()} variant="contained" color="error">削除</Button>
                    </div>
                }
            </footer>
        </>
    );
};

export default Country;