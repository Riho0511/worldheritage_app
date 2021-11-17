import React, { useState, useEffect, useCallback } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DeleteImagesList, Header } from '../parts/index';
import HeritageForm from '../parts/HeritageForm';


const HeritageEdit = () => {
    const { url } = useRouteMatch();
    const countryId = parseInt(url.split('/')[2]);
    const heritageId = parseInt(url.split('/')[4]);
    const history = useHistory();
    const headerMenu = {'menu1':false, 'menu2':false, 'menu3':false, 'menu4':false, 'menu5':false, 'check':false};
    const authchecker = 'user';
    const [name, setName] = useState('');
    const [entranceFee, setEntranceFee] = useState('');
    const [existImages, setExistImages] = useState([]);
    const [images, setImages] = useState([]);

    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/country/${countryId}/heritage/${heritageId}/edit`);
            setName(res.data.heritage.name);
            setEntranceFee(res.data.heritage.entrance_fee);
            const sendImages = res.data.images;
            let setting = [];
            sendImages.forEach((image, index) => {
                setting.push({
                    id: image.id,
                    url: image.image,
                    send: false,
                    count: 0,
                });
            });
            setExistImages(setting);
        };
        
        getData();
    }, []);
    
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
    const updateHeritage = useCallback(async (name, entranceFee, existImages, images) => {
        // 空欄がある場合は実行しない
        const check = postCheck(name, entranceFee);
        if (check) {
            return;
        }
        
        let delImages = [];
        existImages.forEach((img) => {
            if (img.send) {
                delImages.push(img.id);
            }
        });
        
        if (delImages.length == existImages.length && images.length == 0) {
            return;
        }
        
        const data = new FormData();
        data.append("country_id", countryId);
        data.append("name", name);
        data.append("entrance_fee", entranceFee);
        
        delImages.forEach((id, index) => {
            data.append('del_imageId[' + index + ']', id);
        });
        images.forEach((file, index) => {
            data.append('images[' + index + ']', file);
        });
        const headers = {
            "content-type": "multipart/form-data",
            'X-HTTP-Method-Override': 'PUT',
        };
        await axios
            .post('/api/country/' + countryId + '/heritage/' + heritageId, data, { headers })
            .then(response => {
                history.push({
                    pathname: '/country/' + countryId + '/heritage/' + heritageId,
                    state: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
    
    
    return (
        <>
            <Header headerMenu={headerMenu} authchecker={authchecker} />
            <h2>世界遺産編集</h2>
            <HeritageForm 
                name={name}
                setName={setName}
                entranceFee={entranceFee}
                setEntranceFee={setEntranceFee}
                setImages={setImages}
            />
            {images.length > 0 &&
                <p className="white">現在選択されている画像 {images.length}枚</p>
            }
            <DeleteImagesList existImages={existImages} setExistImages={setExistImages} />
            <footer className="mt15 buttons">
                <Stack spacing={2}>
                    <Button 
                        onClick={() => updateHeritage(name, entranceFee, existImages, images)} 
                        variant="contained"
                    >
                        保存
                    </Button>
                    <Button variant="outlined" component={Link} to={`/country/${countryId}/heritage/${heritageId}`}>戻る</Button>
                </Stack>
            </footer>
        </>
    );
};

export default HeritageEdit;