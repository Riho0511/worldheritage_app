import React from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import FestivalIcon from '@mui/icons-material/Festival';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(35,35,40)'
    },
  }
});


const BottomBar = () =>  {
    return (
        <>
            <ThemeProvider theme={theme}>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit">
                        <AttachMoneyIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" color="inherit" component={Link} to="/ranking">
                        <FestivalIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
            </ThemeProvider>
        </> 
    );
};

export default BottomBar;