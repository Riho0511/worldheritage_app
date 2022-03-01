import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { AlertInfo, UpBar } from '../index';


// ホーム画面
const Home = () => {
    const location = useLocation();
    const message = location.state;
    const [states, setStates] = useState([]);
    const stateClass = ["asia", "europe", "africa", "north", "south", "oceania"];
    
    
    useEffect(() => {
        const getData = async () => {
            axios
                .get(`/api/states`)
                .then(res => {
                    setStates(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        
        getData();
    }, []);
    
    
    return (
        <React.Fragment>
            <UpBar />
            {/* 削除通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <div className="states">
                <ul className="button-large">
                    {states.map((state, index) => {
                        return (
                            <li key={state.id} className={stateClass[index]}>
                                <Link to={`/state/${state.id}`}>{state.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </React.Fragment>
    );
};

export default Home;