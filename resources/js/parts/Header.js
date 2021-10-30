import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AppBar from '@mui/material/AppBar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreIcon from '@mui/icons-material/MoreVert';
import PublicIcon from '@mui/icons-material/Public';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const useStyles = makeStyles({
    button: {
        backgroundImage: 'linear-gradient(150deg, rgba(66, 6, 192, 1) 40%, rgba(101, 11, 166, 1) 68%, rgba(68, 10, 151, 1) 90%)',
    },
    bar: {
        backgroundImage: 'linear-gradient(150deg, rgba(3, 0, 180, 1) 10%, rgba(66, 6, 192, 1) 40%, rgba(101, 11, 166, 1) 68%, rgba(68, 10, 151, 1) 90%)',
    }
});


const Header = (props) => {
    const classes = useStyles();
    const headerMenu = props.headerMenu;
    const [moreAnchorEl, setMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(moreAnchorEl);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    
    // 左端ボタン一覧のメニューを開く
    const handleMenuClose = () => {
        setMoreAnchorEl(null);
    };

    // 左端ボタン一覧のメニューを閉じる
    const handleMenuOpen = (event) => {
        setMoreAnchorEl(event.currentTarget);
    };

    // 携帯使用時のボタン一覧のメニューを開く
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    // 携帯使用時のボタン一覧のメニューを閉じる
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    
    // ログアウト
    const logout = () => {
        axios
            .post('/logout')
            .then(() => window.location.href = '/login')
    };
    
    // ホームに戻る
    const toHome = () => {
        window.location.href = "/";
    }
    
    // ボタン一覧(左端)
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={moreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        {headerMenu.menu1 && (
            <MenuItem component={Link} to='/country/currency/list'>
                <IconButton size="large" color="inherit">
                    <AttachMoneyIcon />
                </IconButton>
                <p>通貨編集</p>
            </MenuItem>
        )}
        {headerMenu.menu2 && (
            <MenuItem component={Link} to={`/country/create/${props.state}`}>
                <IconButton size="large" color="inherit">
                    <PublicIcon />
                </IconButton>
                <p>国追加</p>
            </MenuItem>
        )}
        {headerMenu.menu3 && (
            <MenuItem component={Link} to={`/country/${props.countryId}/heritage/create`}>
                <IconButton size="large" color="inherit">
                    <AccountBalanceIcon />
                </IconButton>
                <p>世界遺産追加</p>
            </MenuItem>
        )}
        {headerMenu.menu4 && (
            <MenuItem component={Link} to={`/country/${props.countryId}/edit?state=${props.stateId}`}>
                <IconButton size="large" color="inherit">
                    <EditIcon />
                </IconButton>
                <p>国編集</p>
            </MenuItem>
        )}
        {headerMenu.menu5 && (
            <MenuItem component={Link} to={`/country/${props.countryId}/heritage/${props.heritageId}/edit`}>
                <IconButton size="large" color="inherit">
                    <EditIcon />
                </IconButton>
                <p>世界遺産編集</p>
            </MenuItem>
        )}
        </Menu>
    );

    // ボタン一覧(携帯使用時)
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {props.headerAuth &&
                <MenuItem component={Link} to="/mypage">
                    <IconButton size="large" color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    <p>マイページ</p>
                </MenuItem>
            }
            <MenuItem onClick={logout}>
                <IconButton size="large" color="inherit">
                    <LogoutIcon />
                </IconButton>
                <p>ログアウト</p>
            </MenuItem>
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.bar}>
                <Toolbar>
                    {/* ゲスト認証時は使用不可 */}
                    {props.headerAuth && 
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                    }
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => toHome()}
                    >
                        世界遺産アプリ
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {!props.headerAuth &&
                        <Typography
                            component="div"
                            noWrap
                            sx={{ mr: 2 }}
                        >
                            ようこそゲストさん！
                        </Typography>
                    }
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }} className={classes.button}>
                        {props.headerAuth &&
                            <Button 
                                variant={"contained"} 
                                className={classes.button}
                                component={Link}
                                to="/mypage"
                                startIcon={<AccountCircleIcon />}
                            >
                                マイページ
                            </Button>
                        }
                        <Button 
                            variant={"contained"} 
                            className={classes.button}
                            startIcon={<LogoutIcon />}
                            onClick={logout}
                        >
                            ログアウト
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
        </Box>
    );
};

export default Header;