'use client';

import React, { useEffect, useState } from 'react';

import ManagementTable from './_components/ManagementTable';
import ProfileCardMe from './_components/ProfileCardMe';
import ViewButton from './_components/ViewButton';
import jwt from 'jsonwebtoken';


export default function Profile() {

  const parseToken = (cookie: string) => {
    const token = cookie.split('token=')[1].split(';')[0];
    const decoded = jwt.decode(token) as { username: string };
    return decoded.username;
  }

  const [username, setUsername] = useState('');

  useEffect(() => {
    const username = parseToken(document.cookie);
    setUsername(username);
  }, []);
  
  return (username !== '' &&
    <div className='my-8'>
      
      <div className="flex overflow-hidden relative flex-col py-12">
        <ProfileCardMe username={username} />
        <ViewButton username={username} />
        <ManagementTable />

      </div>
    </div>
  );
};

