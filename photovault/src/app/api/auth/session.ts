'use server';

import { deleteSession, updateSession } from '../_lib/session';
import { redirect } from 'next/navigation';

export async function update(): Promise<boolean> {
  return await updateSession();
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/home');
}
