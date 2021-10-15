import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../parts/index'; 

// alert、通貨編集ページ
const Home = () => {
    const headerMenu = {'menu1':true, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false};
    
    return (
        <>
            <Header headerMenu={headerMenu} />
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