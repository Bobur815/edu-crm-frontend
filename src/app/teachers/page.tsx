import PageHeader from '@/components/ui/PageHeader';
import EntityTable, { Column } from '@/components/ui/EntityTable';
import StatusChip from '@/components/ui/StatusChip';
import { Repo } from '@/lib/repo';
import type { Teacher } from '@/types';


export default function TeachersPage() {
    const rows = Repo.teachers();
    const columns: Column<Teacher>[] = [
        { key: 'fullName', header: 'Full name' },
        { key: 'department', header: 'Department' },
        { key: 'phone', header: 'Phone' },
        { key: 'email', header: 'Email' },
        { key: 'status', header: 'Status', render: (r) => <StatusChip value={r.status} /> }
    ];


    return (
        <div>
            <PageHeader title="Teachers" actionLabel="Add teacher" />
            <EntityTable rows={rows} columns={columns} />
        </div>
    );
}