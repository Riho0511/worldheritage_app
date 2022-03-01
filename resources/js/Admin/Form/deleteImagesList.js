import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { pink } from '@mui/material/colors';

const DeleteImagesList = (props) => {
    // 既存画像削除
    const delImage = (num) => {
        let array = [];
        for (let i=0; i < props.existImages.length; i++) {
            const object = props.existImages[i];
            if (object.id == num) {
                const count = object.count+1;
                const send = object.send ? false : true;
                array.push({
                    id: object.id,
                    url: object.url,
                    send: send,
                    count: count,
                });
            } else {
                array.push(object);
            }
        }
        props.setExistImages(array);
    };
    
    
    return (
        <ImageList sx={{ width: 290, m: '0 auto' }} cols={2} rowHeight={200}>
            {props.existImages.map(image => (
                <ImageListItem key={image.id}>
                    <img
                        className="overflow"
                        src={'https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/' + image.url}
                    />
                    <IconButton size="large" onClick={() => delImage(image.id)}>
                        <DeleteIcon sx={image.send ? { color: pink[500] } : {color: "#9e9e9e"}} />
                    </IconButton>
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default DeleteImagesList;