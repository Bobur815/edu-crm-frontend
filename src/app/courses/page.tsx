import PageHeader from '@/components/ui/PageHeader';
import EntityTable, { Column } from '@/components/ui/EntityTable';
import StatusChip from '@/components/ui/StatusChip';
import { Repo } from '@/lib/repo';
import type { Course } from '@/types';


function formatMinutes(total: number) {
    const h = Math.floor(total / 60); const m = total % 60; return `${h}h ${m}m`;
}


export default function CoursesPage() {
    const rows = Repo.courses();
    const columns: Column<Course>[] = [
        { key: 'title', header: 'Title' },
        { key: 'category', header: 'Category' },
        { key: 'durationMinutes', header: 'Duration', render: (r) => formatMinutes(r.durationMinutes) },
        { key: 'price', header: 'Price', render: (r) => new Intl.NumberFormat('uz-UZ').format(r.price) + ' soʻm' },
        { key: 'status', header: 'Status', render: (r) => <StatusChip value={r.status} /> }
    ];


    return (
        <div>
            <PageHeader title="Courses" actionLabel="Add course" />
            <EntityTable rows={rows} columns={columns} />
        </div>
    );
}