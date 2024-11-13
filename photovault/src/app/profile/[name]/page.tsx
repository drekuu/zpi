'use client';
import React, { useEffect, useState } from 'react';
import ProfileCard from '../_components/ProfileCard';

export default function Profile({
  params,
}: {
  params: { name: string }
}) {

  const [displayedUsername, setDisplayedUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [email, setEmail] = useState('')

  useEffect(() => {
    console.log(params)
    const username = params.name
    console.log(username) 
    fetch(`/api/photograph/${username}`)
      .then(res => res.json())
      .then(data => {
        setDisplayedUsername(data.displayedUserName)
        setAvatarUrl(data.avatarUrl)
        setDescription(data.describe)
        setEmail(data.email)
      })
  }, [])
  
    return (
      <div className='my-8'>

    <div className="flex overflow-hidden relative flex-col py-12">
        <ProfileCard displayedUsername={displayedUsername} email={email} avatarUrl={avatarUrl} aboutMe={description}/>
      </div>
    </div>
    );
  };

