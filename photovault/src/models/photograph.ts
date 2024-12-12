import { Unpacked } from '@/utils/typescript';
import { getFeaturedPhotographers } from '@/app/api/photograph';

export type PhotographUpdateData = {
  displayedUserName?: string;
  avatarUrl?: string;
  aboutMe?: string;
  email?: string;
};

export type FeaturedPhotographer = Unpacked<
  Awaited<ReturnType<typeof getFeaturedPhotographers>>
>;
