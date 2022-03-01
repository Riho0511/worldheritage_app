import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { UpBar, RankTable } from '../index';


const Ranking = () => {
    const history = useHistory();
    const [authchecker, setAuthchecker] = useState('');
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':false};
    const [niceCountries, setNiceCountries] = useState([]);
    const [niceHeritages, setNiceHeritages] = useState([]);
    const [collectCountries, setCollectCountries] = useState([]);
    const [collectHeritages, setCollectHeritages] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/ranking');
            setNiceCountries(res.data.niceCountries);
            setNiceHeritages(res.data.niceHeritages);
            setCollectCountries(res.data.collectCountries);
            setCollectHeritages(res.data.collectHeritages);
            
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
    }, []);
    
    
    return (
        <>
            <UpBar headerMenu={headerMenu} authchecker={authchecker} />
            <h2>みんなのベスト3</h2>
            <div className="ranking_tables">
                <div className="table_split">
                    <RankTable data={niceCountries} genre="国" category="お気に入り" />
                    <RankTable data={niceHeritages} genre="世界遺産" category="お気に入り" />
                </div>
                <div className="table_split">
                    <RankTable data={collectCountries} genre="国" category="コレクト" />
                    <RankTable data={collectHeritages} genre="世界遺産" category="コレクト" />
                </div>
            </div>
            <footer className="buttons">
                <Button variant="outlined" onClick={() => history.goBack()}>戻る</Button>
            </footer>
        </>
    );
};

export default Ranking;