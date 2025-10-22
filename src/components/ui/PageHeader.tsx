'use client';
import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export default function PageHeader({ title, actionLabel, onAction }: {
    title: string; actionLabel?: string; onAction?: () => void;
}) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-6">
            <Typography variant="h5" fontWeight={700}>{title}</Typography>
            {actionLabel && <Button variant="contained" startIcon={<AddIcon />} onClick={onAction}>{actionLabel}</Button>}
        </Stack>
    );
}