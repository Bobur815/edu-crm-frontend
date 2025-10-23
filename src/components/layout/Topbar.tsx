'use client';
import { AppBar, Toolbar, Typography, IconButton, Stack, useMediaQuery } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LocaleSwitcher from '../LocaleSwitcher';
import { AuthArea } from '../AuthArea';
import { absUrl } from '@/lib/media';


export default function Topbar() {
    // breakpoints
    const lgUp = useMediaQuery("(min-width:1200px)"); // lg+
    return (
        <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Toolbar className="md:pl-72">
                <Stack direction="row" alignItems="center" spacing={2} flexGrow={1}>
                    <IconButton edge="start" className="md:hidden" aria-label="menu" size="small">
                        <MenuRoundedIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Educational CRM</Typography>
                </Stack>
                <LocaleSwitcher />
                <AuthArea lgUp={lgUp} absUrl={absUrl} />
            </Toolbar>
        </AppBar>
    );
}