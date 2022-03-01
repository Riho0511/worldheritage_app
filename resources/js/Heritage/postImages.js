import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NearMeIcon from '@mui/icons-material/NearMe';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles({
    right: {
        justifyContent: 'end'
    }
});

const Input = styled('input')({
    display: 'none',
});


// 画像投稿コンポーネント
const PostImages = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const [postImages, setPostImages] = useState([]);
    
    
    // 写真選択
    const selectImages = (e) => {
        const filesList = e.target.files;
        let imgs = [];
        for (let i=0; i < filesList.length; i++) {
            imgs.push(filesList[i]);
        }
        setPostImages(imgs);
    };
    
    // 画像投稿
    const imagesPost = async (images) => {
        
        // 投稿画像がない場合は送信しない
        if (images.length == 0) {
            return;
        }
        
        const data = new FormData();
        images.forEach((file, index) => {
            data.append('images[' + index + ']', file);
        });
        const headers = { "content-type": "multipart/form-data" };
        
        await axios
            .post('/api/heritage/' + props.heritageId + '/images', data, { headers })
            .then(res => {
                props.setImages(res.data.images);
                setPostImages([]);
                history.push({
                    pathname: '/country/' + props.countryId + '/heritage/' + props.heritageId,
                    state: res.data.message,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    
    return (
        <Stack direction="row" spacing={1} className={classes.right}>
            <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" multiple onChange={selectImages} />
                <IconButton color={postImages.length > 0 ? "inherit" : "primary"} component="span">
                    <AddAPhotoIcon />
                </IconButton>
            </label>
            <Button 
                variant="outlined" 
                disabled={postImages.length > 0 ? false : true} 
                startIcon={<NearMeIcon />} 
                size="small" 
                onClick={() => imagesPost(postImages)}
            >
                投稿
            </Button>
        </Stack>
    );
};

export default PostImages;