import PageHeader from '@/components/ui/PageHeader';
import EntityTable, { Column } from '@/components/ui/EntityTable';
import StatusChip from '@/components/ui/StatusChip';
import { Repo } from '@/lib/repo';
import type { Student } from '@/types';


export default function StudentsPage() {
    const rows = Repo.students();
    const columns: Column<Student>[] = [
        { key: 'fullName', header: 'Full name' },
        { key: 'phone', header: 'Phone' },
        { key: 'email', header: 'Email' },
        { key: 'status', header: 'Status', render: (r) => <StatusChip value={r.status} /> }
    ];


    return (
        <div>
            <PageHeader title="Students" actionLabel="Add student" />
            <EntityTable rows={rows} columns={columns} />
        </div>
    );
}