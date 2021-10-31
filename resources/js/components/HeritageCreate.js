import React, { useState, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Header } from '../parts/index';
import HeritageForm from '../parts/HeritageForm';


const HeritageCreate = () => {
    const history = useHistory();
    const countryId = parseInt(useParams().id);
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':false};
    const authchecker = 'admin';
    const [name, setName] = useState('');
    const [entranceFee, setEntranceFee] = useState('');
    const [images, setImages] = useState([]);
    
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
    
    // 世界遺産追加
    const createHeritage = useCallback(async (name, entranceFee, images) => {
        // 空欄がある場合は実行しない
        const check = postCheck(name, entranceFee, images);
        if (check) {
            return;
        }
        
        const data = new FormData();
        data.append("country_id", countryId);
        data.append("name", name);
        data.append("entrance_fee", entranceFee);
        images.forEach((file, index) => {
            data.append('images[' + index + ']', file);
        });
        const headers = { "content-type": "multipart/form-data" };
        await axios
            .post('/api/heritage', data, { headers })
            .then(response => {
                const newId = response.data.newId;
                const message = response.data.message;
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + newId,
                    state: message,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    

    return (
        <>
            <Header headerMenu={headerMenu} authchecker={authchecker} />
            <h2>世界遺産追加</h2>
            <HeritageForm 
                name={name}
                setName={setName}
                entranceFee={entranceFee}
                setEntranceFee={setEntranceFee}
                setImages={setImages}
            />
            {images.length > 0 &&
                <p>現在選択されている画像 {images.length}枚</p>
            }
            <footer className="mt15 buttons">
                <Stack spacing={2}>
                    <Button 
                        onClick={() => createHeritage(name, entranceFee, images)} 
                        variant="contained"
                    >
                        保存
                    </Button>
                    <Button variant="outlined" component={Link} to={`/country/${countryId}`}>戻る</Button>
                </Stack>
            </footer>
        </>
    );
};

export default HeritageCreate;