import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useService } from '../../../../context/ServiceContext';

const DeleteServiceDialog = ({ open, onClose, service }) => {
    const { deleteBusinessService } = useService();

    const handleDeleteEmployee = () => {
        deleteBusinessService(service.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>{`Czy na pewno chcesz usunąć pracownika ${service?.name}?`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Po usunięciu usługi wszystkie aktywne rezerwacje tej usługi zostaną anulowane. Klienci otrzymają wiadomość e-mail z informacją o anulowaniu rezerwacji
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ textTransform: 'none'}}>Anuluj</Button>
                <Button onClick={handleDeleteEmployee} color='error' sx={{ textTransform: 'none'}}>Usuń</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteServiceDialog;