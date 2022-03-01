import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { NoRegisterInformation, Operations, UpBar } from '../index';

const useStyles = makeStyles({
    like: {
        verticalAlign: 'middle',
        marginRight: 10,
    }
});


// 州別国一覧画面
const State = () => {
    const classes = useStyles();
    const stateId = parseInt(useParams().id);
    const [countries, setCountries] = useState([]); // 国一覧
    const [liked, setLiked] = useState([]); // 国のお気に入り情報
    const [collected, setCollected] = useState([]); // 国のコレクト情報
    const [state, setState] = useState([]); // 州情報
    
    
    useEffect(() => {
        const getData = async () => {
            await axios
                .get(`/api/state/${stateId}`)
                .then(res => {
                    setLiked(res.data.likes);
                    setCollected(res.data.collects);
                    setCountries(res.data.countries);
                    setState(res.data.state);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        
        getData();
    }, []);
        
        
    return (
        <React.Fragment>
            <UpBar />
            <div className="countries">
                <h2>{state.name}</h2>
                
                {/* 国一覧 */}
                {countries.length == 0 ? 
                    <NoRegisterInformation page="state" />
                :
                    <ul className="button-large">
                        {countries.map(country => {
                            return (
                                <li key={country.id} className={collected.some((c) => c.country_id === country.id) ? "collected" : "no-collected"}>
                                    {liked.some((l) => l.country_id === country.id) ? 
                                        <Link to={`/country/${country.id}`}>
                                            <ThumbUpAltIcon color="error" className={classes.like} />
                                            {country.name}
                                        </Link>
                                    :
                                        <Link to={`/country/${country.id}`}>
                                            {country.name}
                                        </Link>
                                    }
                                </li>
                            );
                        })}
                    </ul>
                }
            </div>
            <Operations page="state" />
        </React.Fragment>
    );
};

export default State;