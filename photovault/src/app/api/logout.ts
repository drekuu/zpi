'use server';

import { deleteSession } from './_lib/session';
import { redirect } from 'next/navigation';

export async function logout() {
  await deleteSession();
  redirect('/home');
}
