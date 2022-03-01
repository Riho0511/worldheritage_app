import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const CreateInfo = () => {
    const [select, setSelect] = useState(0);
    
    
    return (
        <>
            <Stack direction="row" spacing={2}>
                <Button>国追加</Button>
                <Button>世界遺産追加</Button>
            </Stack>
        </>
    );
}

export default CreateInfo;