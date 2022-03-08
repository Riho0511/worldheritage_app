import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CommentIcon from '@mui/icons-material/Comment';
import ContactsIcon from '@mui/icons-material/Contacts';
import Divider from '@mui/material/Divider';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Typography from '@mui/material/Typography';

const drawerBleeding = 56; // 下から出てくる高さ

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));


const MypageOperations = (props) => {
    const operations = [
        { icon: <ThumbUpIcon />, title: "お気に入り(国)" },
        { icon: <ThumbUpIcon />, title: "お気に入り(世界遺産)" },
        { icon: <AirplaneTicketIcon />, title: "コレクト(国)" },
        { icon: <AirplaneTicketIcon />, title: "コレクト(世界遺産)" },
        { icon: <CommentIcon />, title: "投稿コメント" },
        { icon: <PhotoCameraIcon />, title: "投稿画像" },
        { icon: <ContactsIcon />, title: "お問い合わせ" },
    ];
    
    
    return (
    <React.Fragment>
        <Global
            styles={{
                '.MuiDrawer-root > .MuiPaper-root': {
                    height: `calc(50% - ${drawerBleeding}px)`,
                    overflow: 'visible',
                },
            }}
        />
        <SwipeableDrawer
            anchor="bottom"
            open={props.open}
            onClose={props.toggleDrawer(false)}
            onOpen={props.toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <StyledBox
                sx={{
                    position: 'absolute',
                    top: -drawerBleeding,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    visibility: 'visible',
                    right: 0,
                    left: 0,
                }}
            >
                <Puller />
                <Typography sx={{ p: 2, color: 'text.secondary' }} >操作</Typography>
            </StyledBox>
            <StyledBox
                sx={{
                    pb: 2,
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                {operations.map((ope, index) => {
                    return (
                        <React.Fragment key={ope.title}>
                            <div>
                                <Button sx={{ textAlign: 'left', color: "black" }} startIcon={ope.icon} onClick={() => props.setState(index)}>
                                    {ope.title}
                                </Button>
                            </div>
                            <Divider />
                        </React.Fragment>
                    );
                })}
                <div>
                    <Button sx={{ textAlign: 'left', color: "black" }} onClick={props.toggleDrawer(false)}>
                        閉じる
                    </Button>
                </div>
            </StyledBox>
        </SwipeableDrawer>
    </React.Fragment>
  );
};

export default MypageOperations;
