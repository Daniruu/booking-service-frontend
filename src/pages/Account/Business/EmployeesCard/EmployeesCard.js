import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useEmployee } from '../../../../context/EmployeeContext';
import { useBusiness } from '../../../../context/BusinessContext';
import { formatPhoneNumber, unformatPhoneNumber } from '../../../../utils/formatPhone';
import ExpandMoreButton from '../../../../components/buttons/ExpandMoreButton/ExpandMoreButton';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { validateEmail, validatePhoneNumber, validateTextField } from '../../../../utils/validations';
import CloseIcon from '@mui/icons-material/Close';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const EmployeeCard = () => {
    const { business } = useBusiness();
    const { employees, fetchBusinessEmployees, addEmployee, updateEmployee, deleteEmployee } = useEmployee();
    const [expanded, setExpanded] = useState(true);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const paginatedEmployees = employees?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
    const [addEmployeeData, setAddEmployeeData] = useState({
        name: '',
        position: '',
        email: '',
        phone: ''
    });

    const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false);
    const [editEmployeeData, setEditEmployeeData] = useState({
        name: '',
        position: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        position: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (business) {
            fetchBusinessEmployees(business.id);
        }
    }, [business]);

    const handleOpenAddEmployeeModal = () => {
        setOpenAddEmployeeModal(true);
    };

    const handleCloseAddEmployeeModal = () => {
        setOpenAddEmployeeModal(false);
        setAddEmployeeData({
            name: '',
            position: '',
            email: '',
            phone: ''
        });
        setErrors({
            name: '',
            position: '',
            email: '',
            phone: ''
        });
    };

    const handleAddEmployeeChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const unformattedPhone = unformatPhoneNumber(value);

            if (unformattedPhone.length <= 9) {
                setAddEmployeeData({
                    ...addEmployeeData,
                    phone: formatPhoneNumber(value)
                });
            }
            
        } else {
            setAddEmployeeData({
                ...addEmployeeData,
                [name]: value
            });
        }
    };

    const handleAddEmployeeSubmit = () => {
        if(!validate(addEmployeeData)) {
            return;
        }

        if (business) {
            const unformattedPhone = unformatPhoneNumber(addEmployeeData.phone);
            
            const dataToSubmit = {
                ...addEmployeeData,
                phone: unformattedPhone
            };

            addEmployee(business.id, dataToSubmit);
            handleCloseAddEmployeeModal();
        }
    };

    const handleOpenEditEmployeeModal = (employee) => {
        setSelectedEmployee(employee);
        setEditEmployeeData({
            name: employee.name || '',
            position: employee.position || '',
            email: employee.email || '',
            phone: formatPhoneNumber(employee.phone) || ''
        });
        setOpenEditEmployeeModal(true);
    };

    const handleCloseEditEmployeeModal = () => {
        setOpenEditEmployeeModal(false);
        setEditEmployeeData({
            name: '',
            position: '',
            email: '',
            phone: ''
        });
        setErrors({
            name: '',
            position: '',
            email: '',
            phone: ''
        });
    };

    const handleEditEmployeeChangeChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const unformattedPhone = unformatPhoneNumber(value);

            if (unformattedPhone.length <= 9) {
                setEditEmployeeData({
                    ...editEmployeeData,
                    phone: formatPhoneNumber(value)
                });
            }
        } else {
            setEditEmployeeData({
                ...editEmployeeData,
                [name]: value
            });
        }
    };

    const handleEditEmployeeSubmit = async () => {
        if (!validate(editEmployeeData)) {
            return;
        }
            
        const dataToSubmit = {
            ...editEmployeeData,
            phone: unformatPhoneNumber(editEmployeeData.phone)
        };

        updateEmployee(business.id, selectedEmployee.id, dataToSubmit);
        handleCloseEditEmployeeModal();
    };

    const validate = (formData) => {
        let newErrors = { ...errors };
        
        newErrors.name = validateTextField(formData.name);
        newErrors.position = validateTextField(formData.position);
        newErrors.email = validateEmail(formData.email);
        newErrors.phone = validatePhoneNumber(unformatPhoneNumber(formData.phone));
        
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        
        return !hasErrors;
    };

    const handleMenuClick = (e, employee) => {
        setAnchorEl(e.currentTarget);
        setSelectedEmployee(employee);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditEmployee = () => {
        handleMenuClose();
        handleOpenEditEmployeeModal(selectedEmployee);
    };

    const handleDeleteEmployee = async () => {
        deleteEmployee(business.id, selectedEmployee.id);

        setOpenDeleteModal(false);
        handleMenuClose();
    };

    const openDeleteConfirmation = () => {
        setOpenDeleteModal(true);
        handleMenuClose();
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card elevation={2} sx={{ minWidth: 600, width: '100%' }}>
            <CardHeader
                avatar={<GroupOutlinedIcon />}
                title='Pracownicy'
                subheader='Zarządzaj pracownikami'
                action={<ExpandMoreButton expand={expanded} onClick={handleExpandClick} />}
                sx={{ 
                    '& .MuiCardHeader-action': {
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        alignSelf: 'center'
                    }
                }}
            />
            <Divider />

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                    <Stack direction='column'>
                        <Box p={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h6'>Pracownicy</Typography>
                            <Button 
                                sx={{ textTransform: 'none' }} 
                                variant='contained' 
                                onClick={handleOpenAddEmployeeModal}
                                startIcon={<PersonAddIcon />}
                            >
                                Dodaj
                            </Button>
                        </Box>
                        {employees?.length > 0 ? (
                            <>
                                <TableContainer>
                                    <Table size='small'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Imię</TableCell>
                                                <TableCell>Stanowisko</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Telefon</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paginatedEmployees.map((employee) => (
                                                <TableRow key={employee.id} hover sx={{ cursor: 'pointer' }}>
                                                    <TableCell>{employee.name}</TableCell>
                                                    <TableCell>{employee.position}</TableCell>
                                                    <TableCell>{employee.email}</TableCell>
                                                    <TableCell>{formatPhoneNumber(employee.phone)}</TableCell>
                                                    <TableCell align='right'>
                                                        <IconButton onClick={(e) => handleMenuClick(e, employee)}>
                                                            <MoreHorizIcon />
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
                            </>
                        ) : (
                            <Typography>Brak pracowników</Typography>
                        )}
                    </Stack>
                </CardContent>
            </Collapse>
            
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditEmployee}>
                    <ListItemIcon>
                        <EditIcon fontSize='small' />
                    </ListItemIcon>
                    Edytuj
                </MenuItem>
                <MenuItem onClick={openDeleteConfirmation}>
                    <ListItemIcon>
                        <PersonRemoveIcon fontSize='small' />
                    </ListItemIcon>
                    Usuń
                </MenuItem>
            </Menu>

            {openAddEmployeeModal && (
                <Dialog open={openAddEmployeeModal} onClose={handleCloseAddEmployeeModal}>
                    <DialogTitle>Dodaj pracownika</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ minWidth: 480 }}>
                        <Stack spacing={3}>
                            <TextField
                                label='Imię'
                                name='name'
                                value={addEmployeeData.name}
                                onChange={handleAddEmployeeChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Stanowisko'
                                name='position'
                                value={addEmployeeData.position}
                                onChange={handleAddEmployeeChange}
                                error={Boolean(errors.position)}
                                helperText={errors.position}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Email'
                                name='email'
                                type='email'
                                value={addEmployeeData.email}
                                onChange={handleAddEmployeeChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Telefon'
                                name='phone'
                                type='phone'
                                value={addEmployeeData.phone}
                                onChange={handleAddEmployeeChange}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone}
                                variant='standard'
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <IconButton aria-label='close' onClick={() => handleCloseAddEmployeeModal()} sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                        <Button sx={{ fontSize: 16 }} onClick={() => handleCloseAddEmployeeModal()}>
                            Anuluj
                        </Button>
                        <Button sx={{ fontSize: 16 }} onClick={handleAddEmployeeSubmit}>
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {openEditEmployeeModal && (
                <Dialog open={openEditEmployeeModal} onClose={handleCloseEditEmployeeModal}>
                    <DialogTitle>Dane pracownika</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ minWidth: 480 }}>
                        <Stack spacing={3}>
                            <TextField
                                label='Imię'
                                name='name'
                                value={editEmployeeData.name}
                                onChange={handleEditEmployeeChangeChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Stanowisko'
                                name='position'
                                value={editEmployeeData.position}
                                onChange={handleEditEmployeeChangeChange}
                                error={Boolean(errors.position)}
                                helperText={errors.position}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Email'
                                name='email'
                                type='email'
                                value={editEmployeeData.email}
                                onChange={handleEditEmployeeChangeChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Telefon'
                                name='phone'
                                value={editEmployeeData.phone}
                                onChange={handleEditEmployeeChangeChange}
                                error={Boolean(errors.phone)} // Corrected error handling
                                helperText={errors.phone}
                                variant='standard'
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <IconButton aria-label='close' onClick={handleCloseEditEmployeeModal} sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                        <Button sx={{ fontSize: 16 }} onClick={handleCloseEditEmployeeModal}>
                            Anuluj
                        </Button>
                        <Button sx={{ fontSize: 16 }} onClick={handleEditEmployeeSubmit}>
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {openDeleteModal && (
                <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                    <DialogTitle>Potwierdzenie usunięcia</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Typography>Czy na pewno chcesz usunąć pracownika {selectedEmployee?.name}?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteModal(false)}>Anuluj</Button>
                        <Button onClick={handleDeleteEmployee} color='error'>Usuń</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Card>
    );
}

export default EmployeeCard;