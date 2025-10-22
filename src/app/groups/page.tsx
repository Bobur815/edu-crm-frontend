import PageHeader from '@/components/ui/PageHeader';
import EntityTable, { Column } from '@/components/ui/EntityTable';
import StatusChip from '@/components/ui/StatusChip';
import { Repo } from '@/lib/repo';
import type { Group } from '@/types';


export default function GroupsPage() {
    const rows = Repo.groups();
    const columns: Column<Group>[] = [
        { key: 'title', header: 'Title' },
        { key: 'courseId', header: 'Course' },
        { key: 'teacherId', header: 'Teacher' },
        { key: 'schedule', header: 'Schedule' },
        { key: 'capacity', header: 'Capacity' },
        { key: 'enrolled', header: 'Enrolled' },
        { key: 'status', header: 'Status', render: (r) => <StatusChip value={r.status} /> }
    ];


    return (
        <div>
            <PageHeader title="Groups" actionLabel="Create group" />
            <EntityTable rows={rows} columns={columns} />
        </div>
    );
}