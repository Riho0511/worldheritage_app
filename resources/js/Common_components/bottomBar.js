import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PublicIcon from '@mui/icons-material/Public';
import FestivalIcon from '@mui/icons-material/Festival';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

const theme = createTheme({
    palette: {
        primary: {
        main: 'rgb(30,30,35)'
        },
    }
});


const BottomBar = (props) => {
    const [value, setValue] = useState(0);
    const user = props.user; // ユーザー情報
    const [screen_width, setScreenWidth] = useState(window.innerWidth); // 画面サイズ取得
    
    
    
    
    
    return (
        <React.Fragment>
        {/*
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <Paper sx={{ bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="通貨編集" component={Link} to='/country/currency/list' icon={<AttachMoneyIcon />} />
                        <BottomNavigationAction label="追加" component={Link} to="/test" icon={<AddCircleIcon />} />
                        <BottomNavigationAction label="ランキング" component={Link} to="/ranking" icon={<FestivalIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box>
        </ThemeProvider>
        */}
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Paper sx={{ bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="通貨編集" component={Link} to='/country/currency/list' icon={<AttachMoneyIcon />} />
                        <BottomNavigationAction label="追加" component={Link} to="/test" icon={<AddCircleIcon />} />
                        <BottomNavigationAction label="ランキング" component={Link} to="/ranking" icon={<FestivalIcon />} />
                    </BottomNavigation>
                </Paper>
            </AppBar>
        </ThemeProvider>
        </React.Fragment>
    );
};

export default BottomBar;