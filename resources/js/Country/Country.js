import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { AlertInfo, CheckModal, CountryInformation, HeritageCard, Likeandcollect, NoRegisterInformation, Operations, UpBar } from '../index';
import { LoginUser } from '../Router.js';


// 国情報画面
const Country = () => {
    const countryId = parseInt(useParams().id);
    const location = useLocation();
    const message = location.state;
    const user = useContext(LoginUser);
    const [country, setCountry] = useState([]); // 国情報
    const [heritages, setHeritages] = useState([]); // 国の世界遺産情報
    const [currencies, setCurrencies] = useState([]); // 国の通貨
    const [countryLiked, setCountryLiked] = useState(false); // お気に入り（国）
    const [heritageLiked, setHeritageLiked] = useState(false); // お気に入り登録（世界遺産）
    const [countryCollected, setCountryCollected] = useState(false); // コレクト（国）
    const [heritageCollected, setHeritageCollected] = useState(false); // コレクト（世界遺産）
    const [likeCount, setLikeCount] = useState(0); // お気に入り総数
    const [collectCount, setCollectCount] = useState(0); // コレクト総数
    
    
    useEffect(() => {
        const getData = async () => {
            await axios
                .get(`/api/country/${countryId}`)
                .then(res => {
                    setCountry(res.data.country);
                    setHeritages(res.data.country_heritages);
                    setCurrencies(res.data.currencies);
                    setCountryLiked(res.data.country_liked);
                    setHeritageLiked(res.data.heritage_liked);
                    setCountryCollected(res.data.country_collected);
                    setHeritageCollected(res.data.heritage_collected);
                    setLikeCount(res.data.like_count);
                    setCollectCount(res.data.collect_count);
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
            {/* 国追加通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <h2>{country.name}</h2>
            
            {/* 国情報 */}
                <CountryInformation
                    countryName={country.name} officialName={country.official_name} capital={country.capital}
                    currencies={currencies} timeDifference={country.time_difference} planeMovement={country.plane_movement}
                />

            {/* お気に入り・コレクト */}
            <Likeandcollect 
                type="country" user={user} countryId={countryId}
                collected={countryCollected} setCollected={setCountryCollected} collectCount={collectCount} setCollectCount={setCollectCount}
                liked={countryLiked} setLiked={setCountryLiked} likeCount={likeCount} setLikeCount={setLikeCount}
            />
            
            {/* 世界遺産 */}
            <div className="images-list">
                {heritages.length == 0 ?
                    <NoRegisterInformation page="country" />
                :
                    <div className="image-split">
                        {heritages.map((heritage, index) => {
                            return (
                                <HeritageCard 
                                    key={heritage.heritage.id} 
                                    image={heritage.heritage_images.image} 
                                    heritageName={heritage.heritage.name} 
                                    collected={heritageCollected[index]}
                                    liked={heritageLiked[index]}
                                    countryId={countryId} 
                                    heritageId={heritage.heritage.id} 
                                />
                            );
                        })}
                    </div>
                }
            </div>
            
            <Operations page="country" id1={country.state_id} />
        </React.Fragment>
    );
};

export default Country;