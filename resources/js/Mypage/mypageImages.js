import React from 'react';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const MypageImages = (props) => {
    const handleToggle = (value) => () => {
        const imagesIndex = props.deleteImages.indexOf(value);
        const newImages = [...props.deleteImages];

        if (imagesIndex === -1) {
            newImages.push(value);
        } else { 
            newImages.splice(imagesIndex, 1);
        }

        props.setDeleteImages(newImages);
    };
    
    
    return (
        <React.Fragment>
        <ImageList 
            sx={{ minWidth: 300, maxWidth: 480, height: 380, bgcolor: 'rgb(50,50,60)', m: '0 auto' }} 
            rowHeight={200} 
            gap={1} 
            className="post_images"
        >
            {props.heritageImages.map(image => {
                const cols = image.featured ? 2 : 1;
                const rows = image.featured ? 2 : 1;

                return (
                    <React.Fragment key={image.image}>
                        <ImageListItem cols={cols} rows={rows}>
                            <img src={`https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/${image.image}`} />
                            <ImageListItemBar
                                sx={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)' }}
                                position="top"
                                actionIcon={
                                    <IconButton 
                                        // sx={{ color: 'white' }} 
                                        onClick={handleToggle(image.id)} 
                                        color={props.deleteImages.some(id => id == image.id) ? 'error' : 'inherit'}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                actionPosition="left"
                            />
                        </ImageListItem>
                    </React.Fragment>
                );
            })}
        </ImageList>
        {props.deleteImages.length > 0 &&
            <Button className="mt15" color="error" onClick={props.handleOpen} variant="contained">削除</Button>
        }
        </React.Fragment>
    );
};

export default MypageImages;