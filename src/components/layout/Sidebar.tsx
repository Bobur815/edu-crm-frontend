'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTranslations } from 'next-intl';





export default function Sidebar() {
    const t = useTranslations('sidebar')
    const nav = [
        { href: '/', label: t('dashboard'), icon: <DashboardIcon fontSize="large" /> },
        { href: '/students', label: t('students'), icon: <PeopleIcon fontSize="large" /> },
        { href: '/teachers', label: t('teachers'), icon: <PersonIcon fontSize="large" /> },
        { href: '/courses', label: t('courses'), icon: <SchoolIcon fontSize="large" /> },
        { href: '/groups', label: t('groups'), icon: <GroupIcon fontSize="large" /> }
    ];
    
    const pathname = usePathname();
    return (
        <aside className="hidden md:block fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
            <div className="h-16 flex items-center px-5 border-b">
                <div className="flex items-center justify-center w-full">
                    <img src="./logo.svg" alt="logo" className="h-12" />
                </div>
            </div>
            <nav className="py-3 space-y-1">
                {nav.map(item => (
                    <Link key={item.href} href={item.href} className={clsx(
                        'flex flex-col items-center gap-3 rounded-lg px-2 py-5 text-[30px]',
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