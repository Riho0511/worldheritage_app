import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CountryForm, Header } from '../parts/index';


const CountryCreate = () => {
    const history = useHistory();
    const stateId = parseInt(useParams().id);
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false};
    const headerAuth = true;
    const [currenciesList, setCurrenciesList] = useState([]);
    const [name, setName] = useState('');
    const [officialName, setOfficialName] = useState('');
    const [capital, setCapital] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [newCurrencies, setNewCurrencies] = useState([]);
    const [timeDifference, setTimeDifference] = useState('');
    const [planeMovement, setPlaneMovement] = useState('');
    const [state, setState] = useState(stateId);
 
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/create/${stateId}`);
            setCurrenciesList(res.data);
        };
        
        getData();
    }, []);
    
    // 空欄チェック
    const postCheck = (...prop) => {
        let check = false;
        prop.forEach(p => {
            if (p.length == 0) {
                check = true;
            }
        })
        return check;
    }
    
    // 国追加
    const createCountry = useCallback(async (name, officialName, capital, currencies, newCurrencies, timeDifference, planeMovement, state) => {

        // 空欄がある場合は実行しない
        const check = postCheck(name, officialName, capital, timeDifference, planeMovement);
        if (check) {
            return;
        }
        
        if (currencies.length == 0 && newCurrencies.length == 0) {
            return;
        }
        
        const data = {
            name: name,
            officialName: officialName,
            capital: capital,
            currencies: currencies,
            newCurrencies: newCurrencies,
            timeDifference: timeDifference, 
            planeMovement: planeMovement,
            state: state
        }
        
        await axios
            .post('/api/country', { data: data })
            .then(response => {
                const newId = response.data.newId;
                const message = response.data.message;
                history.push({
                    pathname: '/country/' + newId,
                    state: message,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
        
        
    return (
        <>
            <Header headerMenu={headerMenu} headerAuth={headerAuth} />
            <h2>国追加</h2>
            <CountryForm 
                currenciesList={currenciesList}
                name={name}
                setName={setName}
                officialName={officialName}
                setOfficialName={setOfficialName}
                capital={capital}
                setCapital={setCapital}
                currencies={currencies}
                setCurrencies={setCurrencies}
                newCurrencies={newCurrencies}
                setNewCurrencies={setNewCurrencies}
                timeDifference={timeDifference}
                setTimeDifference={setTimeDifference}
                planeMovement={planeMovement}
                setPlaneMovement={setPlaneMovement}
                state={state}
                setState={setState}
                stateId={stateId}
            />
            <footer className="buttons">
                <Stack spacing={2}>
                    <Button 
                        onClick={() => createCountry(name, officialName, capital, currencies, newCurrencies, timeDifference, planeMovement, state)} 
                        variant="contained"
                    >
                        保存
                    </Button>
                    <Button variant="outlined" component={Link} to={`/country/state/${stateId}`}>戻る</Button>
                </Stack>
            </footer>
        </>
    );
};

export default CountryCreate;