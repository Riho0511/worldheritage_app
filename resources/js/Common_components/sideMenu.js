import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FestivalIcon from '@mui/icons-material/Festival';
import List from '@mui/material/List';
import ListIcon from '@mui/icons-material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';


// サイドメニュー
const SideMenu = () => {
    const [state, setState] = useState(false);
    const sideMenu = [
        { text: "ホーム", icon: <HomeIcon />, to: "/home" },
        { text: "マイページ", icon: <AccountCircleIcon />, to: "/mypage" },
        { text: "ランキング", icon: <FestivalIcon />, to: "/ranking" },
    ];


    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };
    
    // ログアウト
    const logout = () => {
        axios
            .post('/logout')
            .then(() => window.location.href = '/login');
    };


    return (
        <React.Fragment>
            <IconButton onClick={toggleDrawer(true)} size="lerge" color="inherit">
                <ListIcon fontSize="inherit" />
            </IconButton>
            <SwipeableDrawer anchor="right" open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
                <Box sx={{ width: 220 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <List>
                        {sideMenu.map((menu, index) => (
                            <React.Fragment key={menu.text}>
                                <ListItem button component={Link} to={menu.to}>
                                    <ListItemIcon>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.text} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    </List>
                </Box>
            </SwipeableDrawer>
        </React.Fragment>
    );
};

export default SideMenu;