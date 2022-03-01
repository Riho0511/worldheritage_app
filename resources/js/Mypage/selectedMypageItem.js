import React, { useState } from 'react';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import ContactsIcon from '@mui/icons-material/Contacts';
import ImageIcon from '@mui/icons-material/Image';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Comments, ShowData } from '../index';


const SelectedMypageItem = (props) => {
    const [state, setState] = useState(0);
    const lists = [
        { index: 0, text: "お気に入り(国)", icon: <ThumbUpIcon /> },
        { index: 1, text: "お気に入り(世界遺産)", icon: <ThumbUpIcon /> },
        { index: 2, text: "コレクト(国)", icon: <AirplaneTicketIcon /> },
        { index: 3, text: "コレクト(世界遺産)", icon: <AirplaneTicketIcon /> },
        { index: 4, text: "コメント", icon: <CommentIcon /> },
        { index: 5, text: "投稿画像", icon: <ImageIcon /> },
        { index: 6, text: "お問い合わせ", icon: <ContactsIcon /> },
    ];
    let show;
    
    switch (state) {
        case 0:
            show = (<ShowData data={props.likeCountries} />);
            break;
        case 1:
            show = (<ShowData data={props.likeHeritages} />);
            break;
        case 2:
            show = (<ShowData data={props.collectCountries} />);
            break;
        case 3:
            show = (<ShowData data={props.collectHeritages} />);
            break;
        case 4:
            show = (<Comments className="post_comments" comments={props.comments} user={props.user} page="mypage" />);
            break;
        case 5:
            show = (
                <ImageList sx={{ width: 220, height: 380, bgcolor: 'rgb(50,50,60)', m: '0 auto' }} cols={2} rowHeight={125} className="post_images">
                    {props.heritageImages.map(image => (
                        <ImageListItem key={image.image}>
                            <img src={`https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/${image.image}`} />
                        </ImageListItem>
                    ))}
                </ImageList>
            );
            break;
        case 6:
            break;
    }


    return (
        <div className="mypage_info">
            <Box sx={{ width: '260px', bgcolor: 'rgb(35,35,40)' }}>
                <List component="div" aria-label="main mailbox folders">
                    {lists.map((list, index) => {
                        return(
                            <React.Fragment key={list.text}>
                                <ListItemButton onClick={() => setState(index)}>
                                    <ListItemIcon>
                                        {list.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={list.text} />
                                </ListItemButton>
                                <Divider />
                            </React.Fragment>
                        );
                    })}
                </List>
            </Box>
            {show}
        </div>
    );
};

export default SelectedMypageItem;