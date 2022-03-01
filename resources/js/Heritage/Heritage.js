import React, { useState, useEffect, useContext } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AlertInfo, CheckModal, Comments, HeritageInformation, Likeandcollect, Operations, PostComment, PostImages, SwiperImages, UpBar } from '../index';
import { LoginUser } from '../Router';


const Heritage = () => {
    const { url } = useRouteMatch();
    const countryId = parseInt(url.split('/')[2]);
    const heritageId = parseInt(url.split('/')[4]);
    const location = useLocation();
    const message = location.state;
    const user = useContext(LoginUser);
    const [country, setCountry] = useState([]);
    const [heritage, setHeritage] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [images, setImages] = useState([]);
    const [twoComments, setTwoComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [collected, setCollected] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [collectCount, setCollectCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    
    useEffect(() => {
        const getData = async () => {
            await axios
                .get(`/api/country/${countryId}/heritage/${heritageId}`)
                .then(res => {
                    setCountry(res.data.country);
                    setHeritage(res.data.heritage);
                    setCurrency(res.data.currency);
                    setImages(res.data.images);
                    setTwoComments(res.data.comments_info);
                    setLiked(res.data.liked);
                    setCollected(res.data.collected);
                    setLikeCount(res.data.like_count);
                    setCollectCount(res.data.collect_count);
                    setCommentCount(res.data.comment_count);
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
            
            <div className='heritage_information'>
                <div className="split">
                    {/* 世界遺産画像スライダー */}
                    <div className="images">
                        <SwiperImages images={images} />
                        {Object.keys(user).length != 0 &&
                            <PostImages countryId={countryId} heritageId={heritageId} setImages={setImages} />
                        }
                    </div>
                    {/* 世界遺産情報 */}
                    <div className="heritage-info">
                        <HeritageInformation
                            heritageName={heritage.name} countryName={country.name}
                            entranceFee={heritage.entrance_fee} unit={currency.unit}
                        />
                        {/* お気に入り・コレクト */}
                        <Likeandcollect 
                            type="heritage" user={user} countryId={countryId} heritageId={heritageId}
                            collected={collected} setCollected={setCollected} collectCount={collectCount} setCollectCount={setCollectCount}
                            liked={liked} setLiked={setLiked} likeCount={likeCount} setLikeCount={setLikeCount}
                        />
                    </div>
                </div>
                
                {/* コメント */}
                <div className="comment_field">
                    <div className="comments">
                        <Comments 
                            comments={twoComments} setComment={setTwoComments} setCommentCount={setCommentCount}
                            user={user} countryId={countryId} heritageId={heritageId} page="heritage"
                        />
                    </div>
                    {commentCount > 2 &&
                        <Link to={`/country/${countryId}/heritage/${heritageId}/comments`} className="count">コメント{commentCount}件をすべて見る</Link>
                    }
                    {/* コメント投稿 */}
                    <PostComment
                        countryId={countryId} heritageId={heritageId} user={user}
                        twoComments={twoComments} setTwoComments={setTwoComments}
                        setCommentCount={setCommentCount}
                    />
                </div>
            </div>
            <Operations page="heritage" id1={country.id} id2={country.state_id} />
        </React.Fragment>
    );
};

export default Heritage;
