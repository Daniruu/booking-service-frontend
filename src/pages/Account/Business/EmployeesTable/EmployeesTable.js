import React, { useState } from 'react';
import { Avatar, Chip, IconButton, ListItemIcon, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatPhoneNumber } from '../../../../utils/formatPhone';
import { useEmployee } from '../../../../context/EmployeeContext';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditEmployeeDialog from '../EditEmployeeDialog/EditEmployeeDialog';
import DeleteEmployeeDialog from '../DeleteEmployeeDialog/DeleteEmployeeDialog';

const EmployeesTable = () => {
    const { employees } = useEmployee();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editEmployeeDialogOpen, setEditEmployeeDialogOpen] = useState(false);
    const [deleteEmployeeDialogOpen, setDeleteEmployeeDialogOpen] = useState(false);
    const paginatedEmployees = employees?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleMenuClick = (e, employee) => {
        setAnchorEl(e.currentTarget);
        setSelectedEmployee(employee);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditEmployeeDialogOpen = () => {
        setEditEmployeeDialogOpen(true);
        handleMenuClose();
    };

    const handleEditEmployeeDialogClose = () => {
        setEditEmployeeDialogOpen(false);
    };

    const handleDeleteEmployeeDialogOpen = () => {
        setDeleteEmployeeDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteEmployeeDialogClose = () => {
        setDeleteEmployeeDialogOpen(false);
    };

    if (!employees) {
        return (
            <Typography variant='body1' p={2}>Brak pracowników</Typography>
        );
    }
    
    return (
        <Paper elevation={0}>
            <TableContainer>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'text.secondary' }}>Pracownik</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Stanowisko</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Email</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Telefon</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedEmployees?.map((employee) => (
                            <TableRow key={employee.id} hover sx={{ cursor: 'pointer' }}>
                                <TableCell>
                                    <Chip 
                                        avatar={<Avatar alt={employee.name} src={employee.avatarUrl} />} 
                                        label={employee.name}
                                        variant='outlined'
                                    />
                                </TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{formatPhoneNumber(employee.phone)}</TableCell>
                                <TableCell align='right'>
                                    <IconButton onClick={(e) => handleMenuClick(e, employee)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={employees?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage='Liczba wierszy'
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count !== -1 ? count : `więcej niż ${to}`}`}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditEmployeeDialogOpen}>
                    <ListItemIcon>
                        <EditIcon fontSize='small' />
                    </ListItemIcon>
                    Edytuj
                </MenuItem>
                <MenuItem onClick={handleDeleteEmployeeDialogOpen}>
                    <ListItemIcon>
                        <PersonRemoveIcon fontSize='small' />
                    </ListItemIcon>
                    Usuń
                </MenuItem>
            </Menu>
            
            <EditEmployeeDialog open={editEmployeeDialogOpen} onClose={handleEditEmployeeDialogClose} employee={selectedEmployee} />
            <DeleteEmployeeDialog open={deleteEmployeeDialogOpen} onClose={handleDeleteEmployeeDialogClose} employee={selectedEmployee} />
        </Paper>  
    );
}

export default EmployeesTable;