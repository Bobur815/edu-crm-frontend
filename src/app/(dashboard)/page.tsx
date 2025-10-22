import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';
import { Grid2 as Grid } from '@mui/material';
import { Repo } from '@/lib/repo';


export default function DashboardPage() {
    const courses = Repo.courses();
    const students = Repo.students();
    const teachers = Repo.teachers();
    const groups = Repo.groups();


    return (
        <div>
            <PageHeader title="Dashboard" />
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}><StatCard title="Students" value={students.length} /></Grid>
                <Grid size={{ xs: 12, md: 3 }}><StatCard title="Teachers" value={teachers.length} /></Grid>
                <Grid size={{ xs: 12, md: 3 }}><StatCard title="Courses" value={courses.length} /></Grid>
                <Grid size={{ xs: 12, md: 3 }}><StatCard title="Groups" value={groups.length} /></Grid>
            </Grid>
        </div>
    );
}