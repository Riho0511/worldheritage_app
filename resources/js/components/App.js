import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { 
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
    Ranking,
    State 
} from './index'; 

function App() {
    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/mypage" component={Mypage} />
                    <Route exact path="/ranking" component={Ranking} />
                    <Route exact path="/country/currency/list" component={CurrenciesEdit} />
                    <Route path="/country/state/:id" component={State} />
                    <Route path="/country/:id/heritage/create" component={HeritageCreate} />
                    <Route path="/country/:id/heritage/:id/edit" component={HeritageEdit} />
                    <Route path="/country/:id/heritage/:id" component={Heritage} />
                    <Route path="/country/create/:id" component={CountryCreate} />
                    <Route path="/country/:id/edit" component={CountryEdit} />
                    <Route path="/country/:id" component={Country} />
                </Switch>
            </>
        </BrowserRouter>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}