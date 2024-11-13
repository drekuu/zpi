'use client';

import React from 'react';

import ManagementTable from './_components/ManagementTable';
import ProfileCard from './_components/ProfileCardMe';
import ViewButton from './_components/ViewButton';
import jwt from 'jsonwebtoken';

export default function Profile() {

  const parseToken = (cookie: string) => {
    const token = cookie.split('token=')[1];
    const decoded = jwt.decode(token) as { username: string };
    return decoded.username;
  }


    return (
      <div className='my-8'>
        {}
    <div className="flex overflow-hidden relative flex-col py-12">
        <ProfileCard />
        <ViewButton username={parseToken(document.cookie)}/>
        <ManagementTable/>

      </div>
    </div>
    );
  };

