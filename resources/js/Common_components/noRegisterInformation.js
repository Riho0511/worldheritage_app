import React from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
    paper: {
        backgroundColor: 'rgb(40,40,45)',
        height: 40,
        margin: '0 auto 20px',
        maxWidth: 330,
    } 
});


// 表示するデータがないときに表示されるコンポーネント
const NoRegisterInformation = (props) => {
    const classes = useStyles();
    const page = props.page;
    let message;
    
    
    switch (page) {
        case "state":
            message = "登録されている国はありません";
            break;
        case "country":
            message = "登録されている世界遺産はありません";
            break;
    }
    
    
    return (
        <Paper className={classes.paper} elevation={5}>
            <p className="noting-data">{message}</p>
        </Paper>
    );
};

export default NoRegisterInformation;