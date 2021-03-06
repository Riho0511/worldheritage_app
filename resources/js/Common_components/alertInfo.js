import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';


// 通知コンポーネント
const AlertInfo = (props) => {
    const [open, setOpen] = useState(true);


    return (
        <Box sx={{ width: '45vw', position: 'fixed', top: '70px', left: '10px', zIndex: 99 }}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, width: 280 }}
                    icon={<CheckIcon fontSize="inherit" />}
                >
                    {props.message}
                </Alert>
            </Collapse>
        </Box>
    );
};

export default AlertInfo;