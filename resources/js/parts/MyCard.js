import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';


const MyCard = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    
    return (
        <>
            {props.type === "collect" ? 
                <Card sx={{ width: 108, bgcolor: 'rgba(255,120,0,0.8)', m: '10px 5px' }}>
                    <CardActionArea onClick={() => handleOpen()}>
                        <CardContent>
                            <Typography sx={{ color: 'rgb(255,255,255)', fontSize: 12 }}>
                                {props.genre}<br/>コレクト数
                            </Typography>
                            <Typography sx={{ color: 'rgb(255,255,255)' }}>
                                {props.data.length}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                :
                <Card sx={{ width: 108, bgcolor: 'rgba(255,0,0,0.8)', m: '10px 5px' }}>
                    <CardActionArea onClick={() => handleOpen()}>
                        <CardContent>
                            <Typography sx={{ color: 'rgb(255,255,255)', fontSize: 12 }}>
                                {props.genre}<br/>お気に入り数
                            </Typography>
                            <Typography sx={{ color: 'rgb(255,255,255)' }}>
                                {props.data.length}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            }
            <Dialog
                className="tab"
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.data.map((data, index) => {
                            return (
                                <span key={data}>{index+1}. {data}</span>
                            );
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>閉じる</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MyCard;