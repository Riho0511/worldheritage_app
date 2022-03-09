import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import { CheckModal, Operations, UpBar } from '../index';

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


// マイページ編集画面
const MypageEdit = () => {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [newImage, setNewImage] = useState({ image: '', change: false });
    const [preview, setPreview] = useState('');
    const [user, setUser] = useState([]);
    const [currentImage, setCurrentImage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const infomation = [
        { label: "ユーザー名", value: name, type: "text", onChange: e => setName(e.target.value) },
        { label: "メールアドレス", value: email, type: "email", onChange: e => setEmail(e.target.value) },
        { label: "新しいパスワード", value: password, type: "password", onChange: e => setPassword(e.target.value) },
        { label: "新しいパスワード(確認用)", value: confirmPassword, type: "password", onChange: e => setConfirmPassword(e.target.value) },
    ];
    let avatar = newImage.change ? 
        <Avatar src={preview} sx={{ m: '0 auto', width: 70, height: 70 }} /> : 
        <Avatar src={`https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/${currentImage}`} sx={{ m: '0 auto', width: 70, height: 70 }} />;
        
    
    useEffect(() => {
        const getData = async () => {
            await axios
                .get('/api/mypage/edit')
                .then(res => {
                    setUser(res.data.user);
                    setName(res.data.user.name);
                    setEmail(res.data.user.email);
                    setCurrentImage(res.data.user.image);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        
        getData();
    }, []);
    
    
    // 画像更新
    const onFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            setNewImage({image: file, change: true});
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // 空欄チェック
    const postCheck = (...prop) => {
        let check = false;
        prop.forEach(p => {
            if (p.length == 0) {
                check = true;
            }
        });
        return check;
    };
    
    // ユーザー情報更新
    const update = async (id, name, image, email, password, confirmPassword) => {
        
        // 空欄がある場合は実行しない
        const check = postCheck(name, email);
        if (check) {
            return;
        }
        
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        
        if (image.length == 0) {
            data.append("image", currentImage);
            data.append("image_update", "F");
        } else {
            data.append("image", image);
            data.append("image_update", "T");
        }
        
        if (password.length == 0) {
            data.append("password_update", "F");
        } else {
            data.append("password", password);
            data.append("password_update", "T");
        }
        
        const headers = { "content-type": "multipart/form-data" };
        
        await axios
            .post('/api/user/' + id + '/update', data, { headers })
            .then(res => {
                history.push({
                    pathname: '/mypage',
                    state: res.data,
                });
            })
            .catch(error => {
                alert("ユーザー情報の更新に失敗しました");
                console.log(error);
            });
    };
    
    // ユーザー退会
    const userDelete = useCallback(async () => {
        handleClose();
        await axios
            .post('/api/user/delete')
            .then(res => {
                axios
                    .post('/logout')
                    .then(() => window.location.href = '/login');
                })
            .catch(err => {
                alert("ユーザー情報の更新に失敗しました");
                console.log(err);
            });
    });
    
    
    return (
        <React.Fragment>
            <CheckModal open={open} handleClose={handleClose} deleted={userDelete} />
            <UpBar user={user} />
            <div className="mypage_edit">
                <label>アイコン画像</label>
                <p className="warning mb5">アイコンを変更する場合は画像をクリックしてください</p>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" type="file" onChange={e => onFileChange(e)} />
                    {avatar}
                </label>
                <Button size="small" onClick={() => setNewImage({image: '', change: false})} variant="outlined">
                    画像を元に戻す
                </Button>
                {infomation.map(info => {
                    return (
                        <div key={info.label}>
                            <label>{info.label}</label>
                            <TextField
                                autoComplete='off'
                                className={classes.root}
                                fullWidth={true}
                                onChange={info.onChange}
                                required={true}
                                type={info.type}
                                value={info.value}
                            />
                        </div>
                    );
                })}
            </div>
            <Button sx={{ mr: 3 }} onClick={() => update(user.id, name, newImage.image, email, password, confirmPassword)} variant="contained">
                保存
            </Button>
            <Button sx={{ ml: 3 }} onClick={() => setOpen(true)} variant="contained" color="error">
                退会
            </Button>
            <Operations page="tomypage" />
        </React.Fragment>
    );
};

export default MypageEdit;