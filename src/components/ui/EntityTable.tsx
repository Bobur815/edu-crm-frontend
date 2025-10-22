'use client';
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TextField } from '@mui/material';


export type Column<T> = {
    key: keyof T | string;
    header: string;
    render?: (row: T) => React.ReactNode;
};


export default function EntityTable<T extends Record<string, any>>({ rows, columns }: { rows: T[]; columns: Column<T>[]; }) {
    const [orderBy, setOrderBy] = React.useState<string>('');
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [q, setQ] = React.useState('');


    const handleSort = (key: string) => {
        if (orderBy === key) setOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        else { setOrderBy(key); setOrder('asc'); }
    };


    const filtered = React.useMemo(() => {
        const base = q
            ? rows.filter(r => JSON.stringify(r).toLowerCase().includes(q.toLowerCase()))
            : rows;
        if (!orderBy) return base;
        return [...base].sort((a, b) => {
            const va = a[orderBy as keyof typeof a];
            const vb = b[orderBy as keyof typeof b];
            return (va > vb ? 1 : va < vb ? -1 : 0) * (order === 'asc' ? 1 : -1);
        });
    }, [rows, q, orderBy, order]);


    return (
        <Paper sx={{ p: 2, borderRadius: 3 }}>
            <div className="mb-3">
                <TextField size="small" placeholder="Search…" fullWidth value={q} onChange={e => setQ(e.target.value)} />
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
                                    <TableCell key={String(c.key)}>{c.render ? c.render(row) : String(row[c.key as keyof typeof row] ?? '')}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}