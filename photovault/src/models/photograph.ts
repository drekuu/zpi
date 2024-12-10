import { Unpacked } from '@/utils/typescript';
import { getPhotographers } from '@/app/api/photograph';

export type PhotographUpdateData = {
  displayedUserName?: string;
  avatarUrl?: string;
  aboutMe?: string;
  email?: string;
};

export type Photographer = Unpacked<
  Awaited<ReturnType<typeof getPhotographers>>
>;
