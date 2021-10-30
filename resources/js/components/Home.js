import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { AlertInfo, Header } from '../parts/index'; 


const Home = () => {
    const location = useLocation();
    const message = location.state;
    const [authId, setAuthId] = useState(0);
    const headerMenu = authId !== 1 ? {'menu1':true, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false}
                                    : {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false};
    const headerAuth = authId !== 1 ? true : false;
    
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api`);
            setAuthId(res.data.auth);
        };
        
        getData();
    }, []);
    
    
    return (
        <>
            <Header headerMenu={headerMenu} headerAuth={headerAuth} />
            
            {/* 削除通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <div className="states">
                <ul className="button-large">
                    <li><Link to="/country/state/1">アジア</Link></li>
                    <li><Link to="/country/state/2">ヨーロッパ</Link></li>
                    <li><Link to="/country/state/3">アフリカ</Link></li>
                    <li><Link to="/country/state/4">北アメリカ</Link></li>
                    <li><Link to="/country/state/5">南アメリカ</Link></li>
                    <li><Link to="/country/state/6">オセアニア</Link></li>
                </ul>
            </div>
        </>
    );
}

export default Home;