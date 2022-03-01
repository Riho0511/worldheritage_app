import { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CountryForm, UpBar } from '../index';


const CountryEdit = () => {
    const history = useHistory();
    const countryId = parseInt(useParams().id);
    let stateId = useLocation().search.split('=')[1];
    const authchecker = 'user';
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':false};
    const [currenciesList, setCurrenciesList] = useState([]);
    const [name, setName] = useState('');
    const [officialName, setOfficialName] = useState('');
    const [capital, setCapital] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [newCurrencies, setNewCurrencies] = useState([]);
    const [timeDifference, setTimeDifference] = useState('');
    const [planeMovement, setPlaneMovement] = useState('');
    const [state, setState] = useState('');
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
            const res = await axios.get(`/api/country/${countryId}/edit`);
            let array = [];
            setName(res.data.country.name);
            setOfficialName(res.data.country.official_name);
            setCapital(res.data.country.capital);
            setTimeDifference(res.data.country.time_difference);
            setPlaneMovement(res.data.country.plane_movement);
            setState(res.data.country.state);
            setCurrenciesList(res.data.currenciesList);
            res.data.currentCurrencies.forEach(cur => {
                array.push(cur.unit);
            });
            setCurrencies(array);
        };
        
        getData();
    }, []);
    
     // 空欄チェック
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
    
    // 国アップデート
    const updateCountry = useCallback(async (name, officialName, capital, currencies, newCurrencies, timeDifference, planeMovement, state) => {
        
        // 空欄がある場合は実行しない
        const check = postCheck(name, officialName, capital, timeDifference, planeMovement);
        if (check.slice(-1)[0]) {
            for (let i=0; i < check.length-1; i++) {
                if (check[i]) {
                    switch (i) {
                        case 0:
                            setErrorNameCheck(true);
                            setErrorNameMessage('国名を入力してください');
                            break;
                        case 1:
                            setErrorOfficialNameCheck(true);
                            setErrorOfficialNameMessage('正式名称を入力してください');
                            break;
                        case 2: 
                            setErrorCapitalCheck(true);
                            setErrorCapitalMessage('首都を入力してください');
                            break;
                        case 3:
                            setErrorTimeDifferenceCheck(true);
                            setErrorTimeDifferenceMessage('時差を入力してください');
                            break;
                        case 4:
                            setErrorPlaneMovementCheck(true);
                            setErrorPlaneMovementMessage('飛行機時間を入力してください');
                            break;
                    }
                }
            }
            return;
        }
        
        // 通貨が登録されていない場合は実行しない
        if (currencies.length == 0 && newCurrencies.length == 0) {
            setErrorCurrenciesCheck(true);
            return;
        }
        
        const data = {
            name: name,
            official_name: officialName,
            capital: capital,
            currencies: currencies,
            new_currencies: newCurrencies,
            time_difference: timeDifference, 
            plane_movement: planeMovement,
            state: state
        };
        
        await axios
            .put('/api/country/' + countryId, { data: data })
            .then(response => {
                history.push({
                    pathname: '/country/' + countryId,
                    state: response.data.message,
                });
            })
            .catch(error => {
                alert('国情報の更新に失敗しました');
                console.log(error);
            });
    });
        
        
    return (
        <>
            <UpBar headerMenu={headerMenu} authchecker={authchecker} />
            <h2>国編集</h2>
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
                        onClick={() => updateCountry(name, officialName, capital, currencies, newCurrencies, timeDifference, planeMovement, state)} 
                        variant="contained"
                    >
                        保存
                    </Button>
                    <Button variant="outlined" component={Link} to={`/country/${countryId}`}>戻る</Button>
                </Stack>
            </footer>
        </>
    );
};

export default CountryEdit;