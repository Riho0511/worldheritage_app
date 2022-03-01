import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const MyCard = (props) => {
    let bgcolor;
    let type;
    if (props.type == "collect") {
        bgcolor = 'rgba(255,120,0,0.8)';
        type = 'コレクト数';
    } else {
        bgcolor = 'rgba(255,0,0,0.8)';
        type = 'お気に入り数';
    }
    
    
    return (
        <React.Fragment>
            <Card sx={{ width: 108, bgcolor: bgcolor, m: '10px 5px' }}>
                <CardContent>
                    <Typography sx={{ color: 'rgb(255,255,255)', fontSize: 12 }}>
                        {props.genre}<br/>{type}
                    </Typography>
                    <Typography sx={{ color: 'rgb(255,255,255)' }}>
                        {props.data}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default MyCard;