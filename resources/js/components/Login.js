import React from 'react';
import Button from '@mui/material/Button';
import "../../../public/css/login.css";


const Login = () => {
    return (
        <>
            <div id="anime-warp">
                <div id="appear-block">
                    <p className="appear dh">World</p>
                    <p className="appear d1h">Heritage</p>
                    <p className="appear d2h">App</p>
                    <Button 
                        className="appear bh"
                        variant="outlined"
                        onClick={() => window.location.href = '/login'}
                    >
                        ログイン
                    </Button>
                    <div className="warn">
                        <p>使用する場合は以下に同意の上、ご利用ください。</p>
                        <p>・メールアドレス等、個人情報に関する問題は<br/>本サービス側では一切責任を負いません。</p>
                        <p>・投稿された写真の権利は本サービスの管理者に<br/>無償で譲渡します。</p>
                    </div>
                 </div>
            </div>
        </>
    );
};

export default Login;