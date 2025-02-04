'use server';

import {
  deleteSession,
  updateSession as update,
} from '../../../server/session';
import { redirect } from 'next/navigation';

export async function updateSession(): Promise<boolean> {
  return await update();
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/home');
}
