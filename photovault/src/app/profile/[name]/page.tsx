'use client';
import React, { useEffect, useMemo, useState } from 'react';
import ProfileCard from '../_components/ProfileCard';
import Loading from '@/components/LoadedQuery/components/Loading';
import { getPhotosByPhotographer } from '@/app/api/photo';

export default function Profile({
  params,
}: {
  params: { name: string }
}) {

  const [displayedUsername, setDisplayedUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [email, setEmail] = useState('')
  const query = getPhotosByPhotographer(params.name);
  const [photos, setPhotos] = useState<Pick<{ photoURL: string; id: number; photographId: number; title: string; license: boolean; price: number; licensePrice: number; }, "id" | "photoURL" | "title">[]>([]);

  useEffect(() => {
    query.then(data => {
      setPhotos(data);
    });
  }, []);

  const [isLoading, setIsLoading] = useState(true)  

  useEffect(() => {
    const username = params.name
    fetch(`/api/photograph/${username}`)
      .then(res => res.json())
      .then(data => {
        setDisplayedUsername(data.displayedUserName)
        setAvatarUrl(data.avatarUrl)
        setDescription(data.describe)
        setEmail(data.email)
        setIsLoading(false)
      })

  }, [])
  
    return isLoading ? <Loading /> :  (
      <div className='my-8'>

    <div className="flex overflow-hidden relative flex-col py-12 gap-20">
        <ProfileCard displayedUsername={displayedUsername} email={email} avatarUrl={avatarUrl} aboutMe={description}/>
        <div className='w-full flex flex-wrap gap-5'>
     
        {photos && (
          <>
            {photos.map((photo) => (
              <div
                className='flex-auto  max-w-[300px] cursor-pointer'
                key={photo.id}
              >
                <picture>
                  <img
                    className='object-cover object-center w-full h-full'
                    src={photo.photoURL}
                    alt={photo.title}
                  />
                </picture>
              </div>
            ))}
            {photos.length === 0 && (
              <p className='mx-auto'>no-results</p>
            )}
          </>
        )}
  
    </div>
      </div>
    </div>
    );
  };

