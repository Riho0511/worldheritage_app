import React, {useState, useEffect, createContext} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { 
    CommentList,
    CreateInfo,
    Country, 
    CountryCreate, 
    CountryEdit, 
    CurrenciesEdit, 
    Heritage,
    HeritageCreate,
    HeritageEdit,
    Home,
    Login,
    Mypage,
    MypageEdit,
    Ranking,
    State 
} from './index';

// export const LoginUser = createContext();


const Router = () => {
    // const [user, setUser] = useState([]); // ユーザー情報
    
    
    // ユーザー情報取得
    // useEffect(() => {
    //     axios
    //         .get('/api/user')
    //         .then(res => {
    //             setUser(res.data);
    //         }).catch(error => {
    //             console.log(error);
    //         });
    // }, []);
    
    
    return (
        <BrowserRouter>
            {/*<LoginUser.Provider value={ user }>*/}
                <Switch>
                　  {/* ログイン前画面 */}
                    <Route exact path="/" component={Login} />
                    {/* ホーム画面 */}
                    <Route exact path="/home" component={Home} />
                    {/* 州別国一覧画面 */}
                    <Route path="/state/:id" component={State} />
                    {/* コメント一覧画面 */}
                    <Route path="/country/:id/heritage/:id/comments" component={CommentList} />
                    {/* 世界遺産情報画面 */}
                    <Route path="/country/:id/heritage/:id" component={Heritage} />
                    {/* 国情報画面 */}
                    <Route path="/country/:id" component={Country} />
                    
                    <Route exact path="/mypage" component={Mypage} />
                    <Route exact path="/mypage/edit" component={MypageEdit} />
                    {/*<Route exact path="/ranking" component={Ranking} />
                    <Route exact path="/country/currency/list" component={CurrenciesEdit} />
                    <Route exact path="/test" component={CreateInfo} />*/}
                    
                    {/*<Route path="/country/:id/heritage/create" component={HeritageCreate} />
                    <Route path="/country/:id/heritage/:id/edit" component={HeritageEdit} />
                    
                    <Route path="/country/:id/heritage/:id" component={Heritage} />
                    <Route path="/country/create/:id" component={CountryCreate} />
                    <Route path="/country/:id/edit" component={CountryEdit} />
                    */}
                </Switch>
            {/*</LoginUser.Provider>*/}
        </BrowserRouter>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<Router />, document.getElementById('app'));
}