import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { AppBar, Box, Button, Container, Divider, Toolbar, Typography } from '@mui/material';

const Header = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <AppBar color='inherit' sx={{ boxShadow: 'none' }} >
            <Container> 
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <Typography variant='h5' sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 600 }}>
                            <Box component='span' sx={{ color: '#112D4E'}}>
                                BookIt
                            </Box>
                            <Box component='span' sx={{ color: '#3F72AF'}}>
                                Easy
                            </Box>
                        </Typography>
                    </Link>
                    <Box>
                        {user ? (
                            <Button color='inherit' onClick={() => navigate('/account/user')} sx={{ textTransform: 'none' }}>
                                {user.name}
                            </Button>
                        ) : (
                            <Button color='inherit' onClick={() => navigate('/login')} sx={{ textTransform: 'none', fontWeight: 600 }}>
                                Załoguj się / Zarejestruj się
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            <Divider />
        </AppBar>
    );
};

export default Header;