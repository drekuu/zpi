'use client';

import React from 'react';
import ManagementTable from './_components/ManagementTable';
import ProfileCardMe from './_components/ProfileCardMe';
import ViewButton from './_components/ViewButton';
import { useUserStore } from '@/stores/user';

export default function Profile() {
  const userData = useUserStore((store) => store.userData);
  const username = userData?.username;

  return (
    username && (
      <div className='my-8'>
        <div className='flex overflow-hidden relative flex-col py-12'>
          <ProfileCardMe />
          <ViewButton username={username} />
          <div className='mt-16'>
            <ManagementTable username={username} />
          </div>
        </div>
      </div>
    )
  );
}
