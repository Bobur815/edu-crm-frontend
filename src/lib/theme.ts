'use client';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    cssVariables: true,
    colorSchemes: { light: true },
    palette: {
        primary: { main: '#ffb703' },
        secondary: { main: '#219ebc' },
        background: { default: '#f8fafc' }
    },
    shape: { borderRadius: 12 }
});
export default theme;