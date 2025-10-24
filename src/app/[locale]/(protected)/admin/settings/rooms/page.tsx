// src/app/[locale]/(protected)/admin/settings/rooms/page.tsx
'use client';

import * as React from 'react';
import PageHeader from '@/components/ui/PageHeader';
import EntityTable, { Column } from '@/components/ui/EntityTable';
import RightDrawer from '@/components/ui/RightDrawer';
import AddRoomForm, { RoomFormValue } from '@/components/forms/AddRoomForm';
import type { Rooms } from '@/types';
import { useTranslations } from 'next-intl';
import { useRooms, createRoom } from '@/features/rooms/api';
import { useBranches } from '@/features/branches/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function RoomsPage() {
  const t = useTranslations('rooms');

  const { data: rooms = [], isLoading, error } = useRooms();
  const { data: branches = [] } = useBranches();

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<RoomFormValue>({
    name: '',
    branchId: 0,
    capacity: 30,
  });

  const qc = useQueryClient();
  const createMut = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rooms'] });
      setOpen(false);
      setForm({
        name: '',
        branchId: 0,
        capacity: 30,
      });
    },
  });

  // Helper function to get branch name by ID
  const getBranchName = (branchId: number) => {
    const branch = branches.find(b => b.id === branchId);
    return branch?.name || `Branch ${branchId}`;
  };

  const columns: Column<Rooms>[] = [
    { key: 'name', header: t('name') || 'Room Name' },
    { 
      key: 'branchId', 
      header: t('branch') || 'Branch',
      render: (room) => getBranchName(room.branchId)
    },
    { 
      key: 'capacity', 
      header: t('capacity') || 'Capacity',
      render: (room) => `${room.capacity} ${t('people') || 'people'}`
    },
  ];

  const openDrawer = () => {
    setForm({
      name: '',
      branchId: branches.length > 0 ? branches[0].id : 0,
      capacity: 30,
    });
    setOpen(true);
  };

  const save = () => {
    if (!form.name.trim()) {
      alert('Please enter a room name');
      return;
    }
    if (!form.branchId) {
      alert('Please select a branch');
      return;
    }
    if (form.capacity < 1) {
      alert('Capacity must be at least 1');
      return;
    }

    createMut.mutate(form);
  };

  return (
    <div className="p-6">
      <PageHeader 
        title={t('title') || 'Rooms'} 
        actionLabel={t('addRoom') || 'Add Room'} 
        onAction={openDrawer} 
      />

      {error ? (
        <div className="text-red-600 text-sm mb-3">
          {String((error as any)?.message ?? 'Failed to load rooms')}
        </div>
      ) : null}

      <EntityTable 
        data={rooms} 
        columns={columns} 
        loading={isLoading || createMut.isPending} 
      />

      <RightDrawer
        title={t('addRoom') || 'Add Room'}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={save}
        submitting={createMut.isPending}
      >
        <AddRoomForm value={form} onChange={setForm} />
      </RightDrawer>
    </div>
  );
}