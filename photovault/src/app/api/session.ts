'use server';

import { updateSession as update } from './_lib/session';

export async function updateSession() {
  await update();
}
