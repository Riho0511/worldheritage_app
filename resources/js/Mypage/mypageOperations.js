import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
            open={true}
            onClose={props.toggleDrawer(false)}
            onOpen={props.toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding} // 下から出る高さ
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
            <div><Button sx={{ mr: 'auto' }} startIcon={<ThumbUpIcon />}>お気に入り(国)</Button></div>
            <Divider />
            <div><Button sx={{ mr: 'auto' }} startIcon={<ThumbUpIcon />}>お気に入り(国)</Button></div>
            <Divider />
            <div><Button sx={{ mr: 'auto' }} startIcon={<ThumbUpIcon />}>お気に入り(国)</Button></div>
            <Divider />
            <div><Button sx={{ mr: 'auto' }} startIcon={<ThumbUpIcon />}>お気に入り(国)</Button></div>
            <Divider />
            <div><Button sx={{ mr: 'auto' }} startIcon={<ThumbUpIcon />}>お気に入り(国)</Button></div>
            <Divider />
            <div><Button sx={{ mr: 'auto' }} startIcon={<ThumbUpIcon />}>お気に入り(国)</Button></div>
            <Divider />
            <div><Button sx={{ mr: 'auto' }} startIcon={<ThumbUpIcon />}>お気に入り(国)</Button></div>
            <Divider />
            <div><Button sx={{ mr: 'auto' }} startIcon={<ThumbUpIcon />}>お気に入り(国)</Button></div>
            <Divider />
        </StyledBox>
        </SwipeableDrawer>
    </React.Fragment>
  );
};

export default MypageOperations;
