import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WindowIcon from '@mui/icons-material/Window';
import IconButton from '@mui/material/IconButton';
import { SideMenu } from '../index';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(30,30,35)'
        },
    }
});


// ヘッダー
const UpBar = (props) => {
    const [screen_width, setScreenWidth] = useState(window.innerWidth); // 画面サイズ取得
    const user = props.user === [] ? {'image': 'no-profile.png', 'name': 'ゲストさん'} : props.user; // ユーザー情報
    
    let settings = props.page == "mypage" && (
        <IconButton color="inherit" onClick={props.toggleDrawer(true)}>
            <WindowIcon />
        </IconButton>
    );
    
    // windowの幅が変化した際に随時取得
    window.addEventListener('resize', function() {
        setScreenWidth(window.innerWidth);
    });
    
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        
                        {/* ユーザーアイコン */}
                        <Avatar src={`https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/${user.image}`} />
                        <Typography variant="h6" noWrap component="div" sx={{ ml: 1, color: 'white' }}>
                            {user.name}
                        </Typography>
                        
                        {/* 画面横幅が425px以上の時に表示 */}
                        {screen_width >= 425 && 
                            <React.Fragment>
                                <Box sx={{ flexGrow: 0.8 }} />
                                <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
                                    世界遺産アプリ
                                </Typography>
                            </React.Fragment>
                        }
                        <Box sx={{ flexGrow: 1 }} />
                        {settings}
                        <SideMenu />
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
};

export default UpBar;