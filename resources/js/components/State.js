import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../parts/index'; 

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgb(40,40,45)',
        height: 40,
        margin: '0 auto 20px',
        maxWidth: 330,
   } 
});


const State = () => {
    const classes = useStyles();
    const stateId = parseInt(useParams().id);
    const [authchecker, setAuthchecker] = useState('');
    const [countries, setCountries] = useState([]);
    const headerMenu = authchecker === 'admin' && {'menu1':false, 'menu2':true, 'menu3':false, 'menu4':false, 'menu5':false, 'check':true};
    const [state, setState] = useState('');
    const [collected, setCollected] = useState([]);
    
    
    // 州名をセット
    const setStateName = (stateId) => {
        let stateName = '';
        switch (stateId) {
            case 1: stateName = 'アジア';
                    break;
            case 2: stateName = 'ヨーロッパ';
                    break;
            case 3: stateName = 'アフリカ';
                    break;
            case 4: stateName = '北アメリカ';
                    break;
            case 5: stateName = '南アメリカ';
                    break;
            case 6: stateName = 'オセアニア';
                    break;
        }
        setState(stateName);
    }
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/state/${stateId}`);
            setCountries(res.data.countries);
            setCollected(res.data.collected);
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
        };
        
        getData();
        setStateName(stateId);
    }, []);
        
        
    return (
        <>
            <Header headerMenu={headerMenu} authchecker={authchecker} state={stateId} />
            <div className="countries">
                <h2>{state}</h2>
                {countries.length == 0 ? 
                    <Paper className={classes.root} elevation={5}><p className="noting-data">登録されている国はありません</p></Paper>
                :
                    <ul className="button-large">
                        {countries.map(country => {
                            return (
                                <li key={country.id} className={collected.includes(country.id) ? "collected" : ""}><Link to={`/country/${country.id}`}>{country.name}</Link></li>
                            );
                        })}
                    </ul>
                }
            </div>
            <footer>
                <Button variant="outlined" component={Link} to="/home">州を選ぶ</Button>
            </footer>
        </>
    );
};

export default State;