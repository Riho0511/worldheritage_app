import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center',
    },
});


// ページ遷移等ボタン操作コンポーネント
const Operations = (props) => {
    const classes = useStyles();
    let operation;
    let id1;
    let id2;
    
    
    switch (props.page) {
        case "state":
            operation = (<Button variant="outlined" component={Link} to="/home">州を選ぶ</Button>);
            break;
        case "country":
            id1 = props.id1;
            operation = (
                <React.Fragment>
                    <Stack direction="row" spacing={2} className={classes.root}>
                        <Button variant="outlined" component={Link} to={`/state/${id1}`}>国を選ぶ</Button>
                        <Button variant="outlined" component={Link} to="/home">州を選ぶ</Button>
                    </Stack>
                </React.Fragment>
            );
            break;
        case "heritage":
            id1 = props.id1;
            id2 = props.id2;
            operation = (
                <Stack direction="row" spacing={3} className={classes.root}>
                    <Button variant="outlined" component={Link} to={`/country/${id1}`}>国情報</Button>
                    <Button variant="outlined" component={Link} to={`/state/${id2}`}>国を選ぶ</Button>
                    <Button variant="outlined" component={Link} to="/home">州を選ぶ</Button>
                </Stack>
            );
            break;
        case "comment":
            id1 = props.id1;
            id2 = props.id2;
            operation = (<Button variant="outlined" component={Link} to={`/country/${id1}/heritage/${id2}`}>戻る</Button>);
            break;
        case "mypage":
            operation = (<Button variant="outlined" component={Link} to="/home">戻る</Button>);
            break;
        case "mypageEdit":
            operation = (<Button variant="outlined" component={Link} to="/mypage/edit">ユーザー編集</Button>);
            break;
    }
    
    
    return (
        <div className="mt15">
            {operation}
        </div>
    );
};

export default Operations;