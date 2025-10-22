'use client';
import { Card, CardContent, Typography } from '@mui/material';


export default function StatCard({ title, value, hint }: { title: string; value: string | number; hint?: string; }) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">{title}</Typography>
                <Typography variant="h5" fontWeight={800}>{value}</Typography>
                {hint && <Typography variant="caption" color="text.secondary">{hint}</Typography>}
            </CardContent>
        </Card>
    );
}