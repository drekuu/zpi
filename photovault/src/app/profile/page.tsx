'use client';

import React from 'react';
import ManagementTable from './_components/ManagementTable';
import ProfileCardMe from './_components/ProfileCardMe';
import ViewButton from './_components/ViewButton';
import { useGetMyself } from '@/services/query/user';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';

export default function Profile() {
  const query = useGetMyself();
  const username = query.data?.username;

  return (
    <LoadedQuery query={query} handleError={true}>
      {username && (
        <div className='my-8'>
          <div className='flex overflow-hidden relative flex-col py-12'>
            <ProfileCardMe />
            <ViewButton username={username} />
            <ManagementTable />
          </div>
        </div>
      )}
    </LoadedQuery>
  );
}
