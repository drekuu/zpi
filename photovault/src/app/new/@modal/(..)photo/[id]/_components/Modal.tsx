'use client';

import { ElementRef, ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <div className='modal-backdrop'>
      <dialog ref={dialogRef} className='modal' onClose={onDismiss}>
        {children}
        <button onClick={onDismiss} className='close-button' />
      </dialog>
    </div>
  );
}
