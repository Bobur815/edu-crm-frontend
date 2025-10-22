'use client';
import { Chip } from '@mui/material';


type Props = { value: string };
export default function StatusChip({ value }: Props) {
    const color = (
        value === 'active' || value === 'ongoing' ? 'success' :
            value === 'planned' || value === 'draft' ? 'warning' :
                value === 'completed' || value === 'archived' ? 'default' : 'default'
    );
    return <Chip label={value} color={color as any} size="small" variant="outlined" />;
}