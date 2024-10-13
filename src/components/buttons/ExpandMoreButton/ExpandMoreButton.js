import React from 'react';
import { IconButton, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
}),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
}));

const ExpandMoreButton = ({ expand, onClick }) => {
    return (
        <ExpandMore expand={expand} onClick={onClick} aria-expanded={expand} aria-label="show more">
            <ExpandMoreIcon />
        </ExpandMore>
    );
};

export default ExpandMoreButton;