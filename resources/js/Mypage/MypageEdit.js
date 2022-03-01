import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Link, useHistory } from 'react-router-dom';
import { UpBar } from '../index';

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


const MypageEdit = () => {
    const history = useHistory();
    const classes = useStyles();
    const authchecker = "user";
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':false};
    const [userId, setUserId] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [newImage, setNewImage] = useState('');
    const [preview, setPreview] = useState(''); 
    const [changeImage, setChangeImage] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    
    const onFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            setNewImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setChangeImage(true);
        } else {
            setChangeImage(false);
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
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/mypage/edit');
            setUserId(res.data.user.id);
            setName(res.data.user.name);
            setCurrentImage(res.data.user.image);
            setEmail(res.data.user.email);
        };
        
        getData();
    }, []);
    
    
    const update = useCallback(async (id, name, image, email, password, confirmPassword) => {
        
        // 空欄がある場合は実行しない
        const check = postCheck(name, email);
        if (check) {
            return;
        }
        
        const data = new FormData();
        data.append("name", name);
        if (image.length == 0) {
            data.append("image", currentImage);
            data.append("image_update", "F");
        } else {
            data.append("image", image);
            data.append("image_update", "T");
        }
        data.append("email", email);
        if (password.length == 0) {
            data.append("password_update", "F");
        } else {
            data.append("password", password);
            data.append("password_update", "T");
        }
        const headers = { "content-type": "multipart/form-data" };
        
        await axios
            .post('/api/mypage/' + id + '/update', data, { headers })
            .then(response => {
                history.push({
                    pathname: '/mypage',
                    state: response.data,
                });
            })
            .catch(error => {
                alert("ユーザー情報の更新に失敗しました");
                console.log(error);
            });
    });
    
    
    return (
        <React.Fragment>
            <UpBar headerMenu={headerMenu} authchecker={authchecker} />
            <div className="mypage_edit">
                <label>アイコン画像</label>
                <p className="warning">アイコンを変更する場合は画像をクリックしてください</p>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" type="file" onChange={e => onFileChange(e)} />
                    {changeImage ? 
                        <Avatar src={preview} sx={{ m: '0 auto', width: 70, height: 70 }} />
                    :
                        <Avatar src={`https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/${currentImage}`} sx={{ m: '0 auto', width: 70, height: 70 }} />
                    }
                </label>
                <div>
                    <label>ユーザー名</label>
                    <TextField
                        autoComplete='off'
                        className={classes.root}
                        fullWidth={true}
                        onChange={e => setName(e.target.value)}
                        required={true}
                        type='text'
                        value={name}
                    />
                </div>
                <div>
                    <label>メールアドレス</label>
                    <TextField
                        autoComplete='off'
                        className={classes.root}
                        fullWidth={true}
                        onChange={e => setEmail(e.target.value)}
                        required={true}
                        type='email'
                        value={email}
                    />
                </div>
                <div>
                    <label>新しいパスワード</label>
                    <TextField
                        autoComplete='off'
                        className={classes.root}
                        fullWidth={true}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                        value={password}
                    />
                </div>
                <div>
                    <label>新しいパスワード(確認用)</label>
                    <TextField
                        autoComplete='off'
                        className={classes.root}
                        fullWidth={true}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type='password'
                        value={confirmPassword}
                    />
                </div>
            </div>
            <footer className="mt15 buttons">
                <Stack spacing={2}>
                    <Button 
                        onClick={() => update(userId, name, newImage, email, password, confirmPassword)} 
                        variant="contained"
                    >
                        保存
                    </Button>
                    <Button variant="outlined" component={Link} to="/mypage">戻る</Button>
                </Stack>
            </footer>
        </React.Fragment>
    );
};

export default MypageEdit;