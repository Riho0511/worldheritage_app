import { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CountryForm, UpBar } from '../index';


const CountryCreate = () => {
    const history = useHistory();
    const stateId = parseInt(useParams().id);
    const authchecker = 'admin';
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':false};
    const [currenciesList, setCurrenciesList] = useState([]);
    const [name, setName] = useState('');
    const [officialName, setOfficialName] = useState('');
    const [capital, setCapital] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [newCurrencies, setNewCurrencies] = useState([]);
    const [timeDifference, setTimeDifference] = useState('');
    const [planeMovement, setPlaneMovement] = useState('');
    const [state, setState] = useState(stateId);
    const [errorNameCheck, setErrorNameCheck] = useState(false);
    const [errorNameMessage, setErrorNameMessage] = useState('');
    const [errorOfficialNameCheck, setErrorOfficialNameCheck] = useState(false);
    const [errorOfficialNameMessage, setErrorOfficialNameMessage] = useState('');
    const [errorCapitalCheck, setErrorCapitalCheck] = useState(false);
    const [errorCapitalMessage, setErrorCapitalMessage] = useState('');
    const [errorCurrenciesCheck, setErrorCurrenciesCheck] = useState(false);
    const [errorTimeDifferenceCheck, setErrorTimeDifferenceCheck] = useState(false);
    const [errorTimeDifferenceMessage, setErrorTimeDifferenceMessage] = useState('');
    const [errorPlaneMovementCheck, setErrorPlaneMovementCheck] = useState(false);
    const [errorPlaneMovementMessage, setErrorPlaneMovementMessage] = useState('');
 
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/create/${stateId}`);
            setCurrenciesList(res.data.currencies);
        };
        
        getData();
    }, []);
    
    // ??????????????????
    const postCheck = (...prop) => {
        let check = false;
        let array = [];
        prop.forEach(p => {
            if (p.length == 0) {
                check = true;
                array.push(true);
            } else {
                array.push(false);
            }
        });
        array.push(check);
        return array;
    };
    
    // ?????????
    const createCountry = useCallback(async (name, officialName, capital, currencies, newCurrencies, timeDifference, planeMovement, state) => {

        // ???????????????????????????????????????
        const check = postCheck(name, officialName, capital, timeDifference, planeMovement);
        if (check.slice(-1)[0]) {
            for (let i=0; i < check.length-1; i++) {
                if (check[i]) {
                    switch (i) {
                        case 0:
                            setErrorNameCheck(true);
                            setErrorNameMessage('?????????????????????????????????');
                            break;
                        case 1:
                            setErrorOfficialNameCheck(true);
                            setErrorOfficialNameMessage('???????????????????????????????????????');
                            break;
                        case 2: 
                            setErrorCapitalCheck(true);
                            setErrorCapitalMessage('?????????????????????????????????');
                            break;
                        case 3:
                            setErrorTimeDifferenceCheck(true);
                            setErrorTimeDifferenceMessage('?????????????????????????????????');
                            break;
                        case 4:
                            setErrorPlaneMovementCheck(true);
                            setErrorPlaneMovementMessage('??????????????????????????????????????????');
                            break;
                    }
                }
            }
            return;
        }
        
        // ?????????????????????????????????????????????????????????
        if (currencies.length == 0 && newCurrencies.length == 0) {
            setErrorCurrenciesCheck(true);
            return;
        }
        
        const data = new FormData();
        data.append("name", name);
        data.append("official_name", officialName);
        data.append("capital", capital);
        data.append("currencies", currencies);
        data.append("new_currencies", newCurrencies);
        data.append("time_difference", timeDifference);
        data.append("plane_movement", planeMovement);
        data.append("state", state);
        
        await axios
            .post('/api/country', data)
            .then(response => {
                const newId = response.data.newId;
                const message = response.data.message;
                history.push({
                    pathname: '/country/' + newId,
                    state: message,
                });
            })
            .catch(error => {
                alert('??????????????????????????????');
                console.log(error);
            });
    });
        
        
    return (
        <>
            <UpBar headerMenu={headerMenu} authchecker={authchecker} />
            <h2>?????????</h2>
            <CountryForm 
                currenciesList={currenciesList}
                name={name} setName={setName}
                officialName={officialName} setOfficialName={setOfficialName}
                capital={capital} setCapital={setCapital}
                currencies={currencies} setCurrencies={setCurrencies}
                newCurrencies={newCurrencies} setNewCurrencies={setNewCurrencies}
                timeDifference={timeDifference} setTimeDifference={setTimeDifference}
                planeMovement={planeMovement} setPlaneMovement={setPlaneMovement}
                state={state} setState={setState} stateId={stateId}
                errorNameCheck={errorNameCheck} setErrorNameCheck={setErrorNameCheck}
                errorNameMessage={errorNameMessage} setErrorNameMessage={setErrorNameMessage}
                errorOfficialNameCheck={errorOfficialNameCheck}  setErrorOfficialNameCheck={setErrorOfficialNameCheck}
                errorOfficialNameMessage={errorOfficialNameMessage} setErrorOfficialNameMessage={setErrorOfficialNameMessage}
                errorCapitalCheck={errorCapitalCheck} setErrorCapitalCheck={setErrorCapitalCheck}
                errorCapitalMessage={errorCapitalMessage} setErrorCapitalMessage={setErrorCapitalMessage}
                errorCurrenciesCheck={errorCurrenciesCheck} setErrorCurrenciesCheck={setErrorCurrenciesCheck}
                errorTimeDifferenceCheck={errorTimeDifferenceCheck}  setErrorTimeDifferenceCheck={setErrorTimeDifferenceCheck}
                errorTimeDifferenceMessage={errorTimeDifferenceMessage} setErrorTimeDifferenceMessage={setErrorTimeDifferenceMessage}
                errorPlaneMovementCheck={errorPlaneMovementCheck} setErrorPlaneMovementCheck={setErrorPlaneMovementCheck}
                errorPlaneMovementMessage={errorPlaneMovementMessage} setErrorPlaneMovementMessage={setErrorPlaneMovementMessage}
            />
            <footer className="buttons">
                <Stack spacing={2}>
                    <Button 
                        onClick={() => createCountry(name, officialName, capital, currencies, newCurrencies, timeDifference, planeMovement, state)} 
                        variant="contained"
                    >
                        ??????
                    </Button>
                    <Button variant="outlined" component={Link} to={`/country/state/${stateId}`}>??????</Button>
                </Stack>
            </footer>
        </>
    );
};

export default CountryCreate;