import { Container, styled } from "@mui/material";

const WideContainer = styled(Container)(({ theme }) => ({
    maxWidth: '1400px',
    [theme.breakpoints.up('lg')]: {
        maxWidth: '1400px',
    },
}));

export default WideContainer;