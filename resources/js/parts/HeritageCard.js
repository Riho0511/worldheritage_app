import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const useStyles0 = makeStyles({
   root: {
       width: '25%'
   } 
});

const useStyles1 = makeStyles({
    root: {
        height: 250,
    },
});

const useStyles2 = makeStyles({
    root: {
        '&:last-child': {
            paddingBottom: 0,
        },
        padding: 0
    },
});

const useStyles3 = makeStyles({
    root: {
        fontSize: 20,
        marginTop: '0.35em'
    },
});


const HeritageCard = (props) => {
    const classes0 = useStyles0();
    const classes1 = useStyles1();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    
    
    return (
        <Card className={classes0.root}>
        <CardActionArea component={Link} to={'/country/' + props.countryId + '/heritage/' + props.heritageId}>
            <CardMedia
                className={classes1.root}
                component="img"
                image={'https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/' + props.image}
                alt={props.heritageName + 'の画像'}
            />
            <CardContent className={classes2.root}>
                <Typography className={classes3.root} gutterBottom variant="h5" component="p">
                    {props.heritageName}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default HeritageCard;