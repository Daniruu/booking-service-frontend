import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEmployee } from '../../../../context/EmployeeContext';

const DeleteEmployeeDialog = ({ open, onClose, employee }) => {
    const { deleteEmployee } = useEmployee();

    const handleDeleteEmployee = () => {
        deleteEmployee(employee.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>{`Czy na pewno chcesz usunąć pracownika ${employee?.name}?`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Po usunięciu pracownika wszystkie aktywne rezerwacje dla tego pracownika zostaną anulowane. Klienci otrzymają wiadomość e-mail z informacją o anulowaniu rezerwacji
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ textTransform: 'none'}}>Anuluj</Button>
                <Button onClick={handleDeleteEmployee} color='error' sx={{ textTransform: 'none'}}>Usuń</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteEmployeeDialog;