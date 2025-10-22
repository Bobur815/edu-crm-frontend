'use client';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';


export default function Topbar() {
    return (
        <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Toolbar className="md:pl-72">
                <IconButton edge="start" className="md:hidden" aria-label="menu" size="small">
                    <MenuRoundedIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Educational CRM</Typography>
            </Toolbar>
        </AppBar>
    );
}