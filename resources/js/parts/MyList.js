import React from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
   root: {
       backgroundColor: 'rgb(40,40,45)',
   } 
});


const MyList = (props) => {
    const classes = useStyles();
    
    
    return (
        <div className="ranking">
            <h3>{props.genre}</h3>
            <TableContainer component={Paper} className={classes.root}>
                <Table sx={{ width: 320 }}>
                    <TableBody>
                        {props.data.map((data, index) => (
                            <TableRow key={data} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{data}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyList;