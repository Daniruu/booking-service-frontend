import React from 'react';
import { Avatar, Chip, IconButton, TableCell, TableRow } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ServiceTableRow = ({ service, onMenuClick }) => {

    return (
        <TableRow hover>
            <TableCell sx={{ pl: 1 }}>{service.name}</TableCell>
            <TableCell>{service.description}</TableCell>
            <TableCell>
                <Chip
                    avatar={<Avatar alt={service.employeeName} src={service.employeeAvatarUrl} />}
                    label={service.employeeName}
                    variant='outlined'
                />
            </TableCell>
            <TableCell align='right'>{service.duration} min</TableCell>
            <TableCell align='right'>{service.price} zł</TableCell>
            <TableCell align='right'>
                <IconButton onClick={(e) => onMenuClick(e, service)}>
                    <MoreVertIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default ServiceTableRow;

