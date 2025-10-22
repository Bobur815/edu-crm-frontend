'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';


const nav = [
    { href: '/', label: 'Dashboard', icon: <DashboardIcon fontSize="small" /> },
    { href: '/students', label: 'Students', icon: <PeopleIcon fontSize="small" /> },
    { href: '/teachers', label: 'Teachers', icon: <PersonIcon fontSize="small" /> },
    { href: '/courses', label: 'Courses', icon: <SchoolIcon fontSize="small" /> },
    { href: '/groups', label: 'Groups', icon: <GroupIcon fontSize="small" /> }
];


export default function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="hidden md:block fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
            <div className="h-16 flex items-center px-5 border-b">
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className="h-6" />
                    <span className="font-semibold">EduCRM</span>
                </div>
            </div>
            <nav className="p-3 space-y-1">
                {nav.map(item => (
                    <Link key={item.href} href={item.href} className={clsx(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm',
                        pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50')
                    }>
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}