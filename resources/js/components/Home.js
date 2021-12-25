import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AlertInfo, Header } from '../parts/index';
import BottomBar from '../common/BottomBar';


const Home = () => {
    const location = useLocation();
    const message = location.state;
    const [authchecker, setAuthchecker] = useState('');
    const headerMenu = authchecker === 'admin' && {'menu1':true, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':true};
    
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/home`);
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
            <Header headerMenu={headerMenu} authchecker={authchecker} />
            
            {/* 削除通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <div className="states">
                <ul className="button-large">
                    <li className="asia"><Link to="/country/state/1">アジア</Link></li>
                    <li className="europe"><Link to="/country/state/2">ヨーロッパ</Link></li>
                    <li className="africa"><Link to="/country/state/3">アフリカ</Link></li>
                    <li className="north"><Link to="/country/state/4">北アメリカ</Link></li>
                    <li className="south"><Link to="/country/state/5">南アメリカ</Link></li>
                    <li className="oceania"><Link to="/country/state/6">オセアニア</Link></li>
                </ul>
            </div>
            
            <BottomBar />
        </>
    );
};

export default Home;