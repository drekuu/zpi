import 'server-only';
import { router } from './trpc';
import { getAllCategories } from '@/app/api/_routes/category';
import { getMyself as getMyselfUser } from '@/app/api/_routes/user';
import {
  getPhoto,
  getPhotos,
  getPhotosByIds,
  getPhotosByPhotographer,
} from '@/app/api/_routes/photo';
import { getAllTags } from '@/app/api/_routes/tag';
import {
  getMyself as getMyselfPhotograph,
  updateMyself,
  getPhotographer,
  getFeaturedPhotographers,
} from '@/app/api/_routes/photograph';

export const appRouter = router({
  category: {
    getAllCategories,
  },
  user: {
    getMyself: getMyselfUser,
  },
  photo: {
    getPhoto,
    getPhotos,
    getPhotosByIds,
    getPhotosByPhotographer,
  },
  tag: {
    getAllTags,
  },
  photograph: {
    getMyself: getMyselfPhotograph,
    updateMyself,
    getPhotographer,
    getFeaturedPhotographers,
  },
});

export type AppRouter = typeof appRouter;
