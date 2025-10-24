// src/app/[locale]/(protected)/admin/settings/layout.tsx
'use client';

import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { clsx } from 'clsx';
import SchoolIcon from '@mui/icons-material/School';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CategoryIcon from '@mui/icons-material/Category';
import { useTranslations } from 'next-intl';

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = useTranslations('settings');
    const pathname = usePathname();
    const params = useParams();
    const locale = params.locale as string;

    const settingsNavItems = [
        {
            href: `/${locale}/admin/settings/courses`,
            label: t('courses') || 'Courses',
            icon: <SchoolIcon fontSize="small" />
        },
        {
            href: `/${locale}/admin/settings/course-categories`,
            label: t('courseCategories') || 'Course Categories',
            icon: <CategoryIcon fontSize="small" />
        },
        {
            href: `/${locale}/admin/settings/rooms`,
            label: t('rooms') || 'Rooms',
            icon: <MeetingRoomIcon fontSize="small" />
        },
    ];

    return (
        <div className="flex h-full -translate-x-22">
            {/* Settings Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 h-full">

                <nav className="py-4 space-y-1">
                    {settingsNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-3 rounded-lg text-lg font-medium transition-colors',
                                pathname.includes(item.href)
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Settings Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}