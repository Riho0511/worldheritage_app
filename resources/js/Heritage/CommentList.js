import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { AlertInfo, Comments, Operations, UpBar } from '../index';

// コメント一覧
const CommentList = () => {
    const location = useLocation();
    const message = location.state;
    const { url } = useRouteMatch();
    const countryId = parseInt(url.split('/')[2]);
    const heritageId = parseInt(url.split('/')[4]);
    const [user, setUser] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    
    
    useEffect(() => {
        const getData = async () => {
            await axios
                .get(`/api/country/${countryId}/heritage/${heritageId}/comments`)
                .then(res => {
                    setUser(res.data.user);
                    setComments(res.data.comments);
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
            <UpBar user={user} />
            {/* 国追加通知アラート */}
            {message !== undefined && 
                <AlertInfo message={message} />
            }
            
            <div className="comment_field">
                <Comments 
                    comments={comments} setComment={setComments} setCommentCount={setCommentCount}
                    user={user} countryId={countryId} heritageId={heritageId} page="list"
                />
            </div>
            <Operations page="comment" id1={countryId} id2={heritageId} />
        </React.Fragment>
    );
};

export default CommentList;