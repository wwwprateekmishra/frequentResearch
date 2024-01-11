import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Card, TableBody, TableCell, tableCellClasses } from '@mui/material';
import FormModal, { calculateAge } from './modal/FormModal';
import { ToastContainer } from 'react-toastify';
import useUser from './hooks/useUser';
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'red',
        color: 'white'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
function Dashboard() {
    const { getData } = useUser()
    const [data, setData] = useState([])
    const [dataAdd, setDataAdd] = useState([])
    useEffect(() => {
        ; (async () => {
            let res = await getData()
            if (res.status === 201) {
                setData(res.data)
            }
        })().catch((e) => {
            console.log(e);
        })
    }, [dataAdd])
    return (
        <Card>
            <FormModal name='Add Data' setDataAdd={setDataAdd} dataAdd={dataAdd} />
            <Box py="10px" />
            <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" >Sr.No</StyledTableCell>
                            <StyledTableCell align="center" >First Name</StyledTableCell>
                            <StyledTableCell align="center" >Last Name</StyledTableCell>
                            <StyledTableCell align="center" >Email</StyledTableCell>
                            <StyledTableCell align="center" >Country</StyledTableCell>
                            <StyledTableCell align="center" >State</StyledTableCell>
                            <StyledTableCell align="center" >city</StyledTableCell>
                            <StyledTableCell align="center" >DOB </StyledTableCell>
                            <StyledTableCell align="center" >Age</StyledTableCell>
                            <StyledTableCell align="center" >Gender </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {
                        data.map((d, i) => {
                            return (
                                <StyledTableRow key={i}>
                                    <StyledTableCell align="center" >{i + 1}</StyledTableCell>
                                    <StyledTableCell align="center" >{d.fname}</StyledTableCell>
                                    <StyledTableCell align="center" >{d.lname}</StyledTableCell>
                                    <StyledTableCell align="center" >{d.email}</StyledTableCell>
                                    <StyledTableCell align="center" >{d.country}</StyledTableCell>
                                    <StyledTableCell align="center" >{d.state}</StyledTableCell>
                                    <StyledTableCell align="center" >{d.city}</StyledTableCell>
                                    <StyledTableCell align="center" >{d.dob} </StyledTableCell>
                                    <StyledTableCell align="center" >{calculateAge(d.dob)}</StyledTableCell>
                                    <StyledTableCell align="center" >{d.gender} </StyledTableCell>
                                </StyledTableRow>
                            )
                        })
                    }
                    <TableBody />
                </Table>
            </TableContainer>
            <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClickrtl={false} pauseOnFocusLoss draggablepauseOnHover />

        </Card>
    );
}
export default Dashboard;