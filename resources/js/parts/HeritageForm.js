import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';

let count=0;
const Input = styled('input')({
  display: 'none',
});

const useStyles = makeStyles({
    root: {
        border: "2px solid blue",
        borderRadius: 4,
        height: 55,
        margin: 0,
    },
});


const HeritageForm = (props) => {
    const classes = useStyles();
    const [errorNameCheck, setErrorNameCheck] = useState(false);
    const [errorNameMessage, setErrorNameMessage] = useState('');
    const [errorEntranceFeeCheck, setErrorEntranceFeeCheck] = useState(false);
    const [errorEntranceFeeMessage, setErrorEntranceFeeMessage] = useState('');
    
    
    // 世界遺産名入力
    const inputName = (event) => {
        let error = '';
        if (event.target.value === '') {
            error = '世界遺産名を入力してください';
            setErrorNameCheck(true);
        } else {
            setErrorNameCheck(false);
        }
        setErrorNameMessage(error);
        props.setName(event.target.value);
    }
    
    // 入場料入力
    const inputEntranceFee = (event) => {
        let error = '';
        if (event.target.value === '') {
            error = '入場料を入力してください';
            setErrorEntranceFeeCheck(true);
        } else {
            setErrorEntranceFeeCheck(false);
        }
        setErrorEntranceFeeMessage(error);
        props.setEntranceFee(event.target.value);
    };
    
    // 写真プレビュー
    const previewFile = (file, num) => {
        const preview = document.getElementById('preview');
        const reader = new FileReader();
        
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            const img = document.createElement('img'); 
            img.src = imageUrl;
            img.setAttribute("id", `deleteImage${num}`);
            img.setAttribute("onClick", `deleteImage(${num})`);
            preview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
    
    // 写真選択
    const selectImages = (e) => {
        const filesList = e.target.files;
        let imgs = [];
        for (let i=0; i < filesList.length; i++) {
            imgs.push(filesList[i]);
            // previewFile(filesList[i], count);
            count++;
        }
        props.setImages(imgs);
    };
    
    
    return (
        <>
            <div className="create_heritage">
                <div>
                    <label className="required">世界遺産名</label>
                    <TextField
                        autoComplete='off'
                        autoFocus={true}
                        className={classes.root}
                        error={errorNameCheck}
                        fullWidth={true}
                        helperText={errorNameMessage}
                        onChange={inputName}
                        required={true}
                        type='text'
                        value={props.name}
                    />
                </div>
                <div>
                    <label className="required">入場料</label>
                    <p className="warning">数字入力</p>
                    <TextField
                        autoComplete='off'
                        className={classes.root}
                        error={errorEntranceFeeCheck}
                        fullWidth={true}
                        helperText={errorEntranceFeeMessage}
                        onChange={inputEntranceFee}
                        required={true}
                        type='text'
                        value={props.entranceFee}
                    />
                </div>
                <div>
                    <label className="required">世界遺産画像</label>
                    <label htmlFor="contained-button-file" className="photo">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={selectImages} />
                        <Button color="inherit" variant="contained" component="span" startIcon={<PhotoCamera/>}>画像保存</Button>
                    </label>
                </div>
                <div id="preview"></div>
            </div>
        </>
    );
};

export default HeritageForm;