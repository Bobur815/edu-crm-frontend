// src/components/ui/EntityTable.tsx
'use client';
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';

export type Column<T> = {
    key: keyof T | string;
    header: string;
    render?: (row: T) => React.ReactNode;
};

export type ApiResponse<T> = {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
};

export default function EntityTable<T extends Record<string, any>>({ 
    data, 
    columns, 
    loading 
}: { 
    data: ApiResponse<T> | T[] | undefined; 
    columns: Column<T>[]; 
    loading: boolean; 
}) {
    const t = useTranslations('common');

    const [orderBy, setOrderBy] = React.useState<string>('');
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [q, setQ] = React.useState('');

    const rows = React.useMemo(() => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        return data.data || [];
    }, [data]);

    const handleSort = (key: string) => {
        if (orderBy === key) setOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        else { setOrderBy(key); setOrder('asc'); }
    };

    const filtered = React.useMemo(() => {
        const base = q
            ? rows.filter((r: T) => JSON.stringify(r).toLowerCase().includes(q.toLowerCase()))
            : rows;
        if (!orderBy) return base;
        return [...base].sort((a, b) => {
            const va = a[orderBy as keyof typeof a];
            const vb = b[orderBy as keyof typeof b];
            return (va > vb ? 1 : va < vb ? -1 : 0) * (order === 'asc' ? 1 : -1);
        });
    }, [rows, q, orderBy, order]);


    if (loading) {
        return (
            <Paper sx={{ p: 2, borderRadius: 3 }}>
                <div>{t('loading')}</div>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 2, borderRadius: 1 }}>
            <div className="mb-3">
                <TextField size="small" placeholder={t('search')} fullWidth value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map(c => (
                                <TableCell key={String(c.key)}>
                                    <TableSortLabel active={orderBy === c.key} direction={order} onClick={() => handleSort(String(c.key))}>
                                        {c.header}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((row, idx) => (
                            <TableRow key={idx} hover>
                                {columns.map(c => (
                                    <TableCell key={String(c.key)}>
                                        {c.render ? c.render(row) : String(row[c.key as keyof typeof row] ?? '')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}