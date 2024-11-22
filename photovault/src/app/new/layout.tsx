import New from './_components/New';
import { ReactNode } from 'react';

export default async function NewLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {modal}
      <New>{children}</New>
    </>
  );
}
