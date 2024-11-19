import New from './_components/New';
import { ReactNode } from 'react';

export default async function NewLayout({ children }: { children: ReactNode }) {
  return <New>{children}</New>;
}
