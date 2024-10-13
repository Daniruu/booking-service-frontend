import React from 'react';
import { Box, Grid2, Link, Typography } from '@mui/material';
import WideContainer from '../WideContainer/WideContainer';

const Footer = () => {
    return (
        <Box 
            component="footer" 
            sx={{ 
                backgroundColor: '#112D4E', 
                color: '#FFFFFF', 
                py: 6, 
                mt: 'auto' 
            }}
        >
            <WideContainer>
                <Typography variant='body1' align='start' sx={{ mt: 1 }}>
                    Stworzono przez Danila Shuliakouski jako część pracy dyplomowej i portfolio
                </Typography>
                <Typography variant='body1' align='start' sx={{ mt: 1 }}>
                    Aplikacja internetowa do rezerwacji usług online
                </Typography>
                <Typography variant='body1' align='start' sx={{ mt: 1 }}>
                Kontakt: <Link href="mailto:danila.shuliakouski@gmail.com" color="inherit">danila.shuliakouski@gmail.com</Link>
                </Typography>
                <Typography variant='body2' align='center'>
                    © {new Date().getFullYear()} BookItEasy. Wszelkie prawa zastrzeżone.
                </Typography>
            </WideContainer>
        </Box>
    );
};

export default Footer;