import React from 'react';
import { useRouter } from 'next/navigation';

interface UserViewButtonProps {
  username: string;
}

const UserViewButton = ({ username }: UserViewButtonProps) => {
  const router = useRouter();
  const redirectToProfile = (username: string) => {
    const url = `/profile/${username}`;
    router.push(url);
  }
  
  return (
    <button onClick={() =>redirectToProfile(username)} className="overflow-hidden self-center mt-16 font-medium text-white bg-black min-h-[44px] rounded-[62px] w-[236px]">
      User view
    </button>
  );
};

export default UserViewButton;