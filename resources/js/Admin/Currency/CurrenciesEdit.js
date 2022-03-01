import { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CheckModal, CurrenciesList, UpBar } from '../../index'; 


const CurrenciesEdit = () => {
    const history = useHistory();
    const authchecker = 'admin';
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':false};
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [currenciesList, setCurrenciesList] = useState([]);
    const [checked, setChecked] = useState([]);
  
  
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/currency/list`);
            setCurrenciesList(res.data);
        };
        
        getData();
    }, []);
    
    // 通貨一括削除
    const deleted = useCallback(async () => {
        
        // 削除する通貨がなければ実行しない
        if (checked.length == 0) {
            return;
        }
        
        await axios
            .post('/api/currency', { data: checked })
            .then(response => {
                history.push({
                    pathname: '/home',
                    state: response.data,
                });
            })
            .catch(error => {
                alert("削除に失敗しました");
                console.log(error);
            });
    });
    
    
    return (
        <>
            <UpBar headerMenu={headerMenu} authchecker={authchecker} />
            <div className="currencies_edit">
                <h2>通貨編集</h2>
                <p className="error-message">削除する通貨にチェックを入れてください</p>
                <CurrenciesList currenciesList={currenciesList} checked={checked} setChecked={setChecked} />
            </div>
            <CheckModal open={open} handleClose={handleClose} deleted={deleted} />
            <footer className="buttons">
                <Stack spacing={2}>
                    <Button color="error" onClick={() => handleOpen()} variant="contained">削除</Button>
                    <Button variant="outlined" component={Link} to="/home">戻る</Button>
                </Stack>
            </footer>
        </>
    );
};

export default CurrenciesEdit;