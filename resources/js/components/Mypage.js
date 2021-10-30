import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../parts/index';


const Mypage = () => {
    const [user, setUser] = useState('');
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false};
    const headerAuth = true;
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/mypage');
            setUser(res.data.user);
        };
        
        getData();
    }, [setUser]);
    // <img src={'https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/' + user.image} />
    
    return (
        <>
            <Header headerMenu={headerMenu} headerAuth={headerAuth} />
            <div className="mypage">
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
        </>
    );
};

export default Mypage;