import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../parts/index'; 

// alert
const State = () => {
    const stateId = parseInt(useParams().id);
    const [state, setState] = useState('');
    const [authId, setAuthId] = useState(0);
    const [countries, setCountries] = useState([]);
    const headerMenu = authId !== 1 ? {'menu1':false, 'menu2':true, 'menu3':false, 'menu4':false, 'menu5':false}
                                    : {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false};
    const headerAuth = authId !== 1 ? true : false;
    
    
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
            setAuthId(res.data.auth);
        };
        
        getData();
        setStateName(stateId);
    }, [setCountries]);
        
        
    return (
        <>
            <Header headerMenu={headerMenu} headerAuth={headerAuth} state={stateId} />
            <div className="countries">
                <h2>{state}</h2>
                {countries.length === 0 ? 
                    <Paper className="noting-data" elevation={5}><p>登録されている国はありません。</p></Paper>
                :
                    <ul className="button-large">
                        {countries.map(country => {
                            return (
                                <li key={country.id}><Link to={`/country/${country.id}`}>{country.name}</Link></li>
                            );
                        })}
                    </ul>
                }
            </div>
            <footer>
                <Button variant="outlined" component={Link} to="/">州を選ぶ</Button>
            </footer>
        </>
    );
};

export default State;