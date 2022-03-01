import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const useStyles = makeStyles({
    root: {
        '&:last-child': {
            paddingBottom: 0,
        },
        padding: 0
    },
    width: {
       width: '25%'
    },
    height: {
        height: 250,
    },
    normal: {
        fontSize: 20,
        marginTop: '0.35em'
    },
    collected: {
        color: "rgb(248, 155, 48)",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '0.35em'
    },
    like: {
        verticalAlign: 'bottom',
        paddingRight: 5,
    }
});


// 世界遺産カードコンポーネント
const HeritageCard = (props) => {
    const classes = useStyles();
    let liked;
    
    if (props.liked) {
        liked = (
            <Typography className={props.collected ? classes.collected : classes.normal} gutterBottom variant="h5" component="p">
                <ThumbUpAltIcon color="error" className={classes.like} />{props.heritageName}
            </Typography>
        );
    } else {
        liked = (
            <Typography className={props.collected ? classes.collected : classes.normal} gutterBottom variant="h5" component="p">
                {props.heritageName}
            </Typography>
        );
    }
    
    
    return (
        <Card className={classes.width}>
        <CardActionArea component={Link} to={'/country/' + props.countryId + '/heritage/' + props.heritageId}>
            <CardMedia
                className={classes.height}
                component="img"
                image={'https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/' + props.image}
                alt={props.heritageName + 'の画像'}
            />
            <CardContent className={classes.root}>
                {liked}
            </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default HeritageCard;