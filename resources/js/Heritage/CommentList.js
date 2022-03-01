import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { AlertInfo, Comments, Operations, UpBar } from '../index';
import { LoginUser } from '../Router';


// コメント一覧
const CommentList = () => {
    // const classes = useStyles();
    const user = useContext(LoginUser);
    const location = useLocation();
    const message = location.state;
    const { url } = useRouteMatch();
    const countryId = parseInt(url.split('/')[2]);
    const heritageId = parseInt(url.split('/')[4]);
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    
    
    useEffect(() => {
        const getData = async () => {
            await axios
                .get(`/api/country/${countryId}/heritage/${heritageId}/comments`)
                .then(res => {
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
            <UpBar />
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