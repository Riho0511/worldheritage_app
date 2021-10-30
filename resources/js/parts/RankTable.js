import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const RankTable = (props) => {
    return (
        <div className="ranking">
            <h3>{props.category}({props.genre})</h3>
            <TableContainer component={Paper}>
                <Table sx={{ width: 320 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">順位</TableCell>
                            <TableCell align="center">{props.genre}名</TableCell>
                            <TableCell align="center">{props.category}数</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((data, index) => (
                            <TableRow key={data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{index+1}</TableCell>
                                <TableCell align="center">{data.name}</TableCell>
                                <TableCell align="center">{data.cnt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default RankTable;