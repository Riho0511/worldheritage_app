import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import { Home } from './index'; 

function App() {
    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </>
        </BrowserRouter>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}