'use client';

import {
  ElementRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useOnClickOutside } from 'usehooks-ts';
import CloseIcon from '@/../public/icons/close.svg';

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);
  const contentRef = useRef<ElementRef<'div'>>(null);

  const openedPathname = useState(pathname)[0];

  const onDismiss = useCallback(() => {
    if (pathname === openedPathname) {
      router.back();
    }
  }, [router, pathname, openedPathname]);

  useEffect(() => {
    if (pathname !== openedPathname && dialogRef.current?.open) {
      dialogRef.current?.close();
    }
  }, [router, openedPathname, pathname]);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  useOnClickOutside(contentRef, onDismiss);

  return (
    <dialog
      ref={dialogRef}
      className='relative backdrop:backdrop-blur-sm w-11/12 h-5/6 max-w-[1000px] m-auto rounded-4xl overflow-clip py-16 px-8'
      onClose={onDismiss}
    >
      <div className='w-full h-full overflow-y-auto' ref={contentRef}>
        <div>
          {children}
          <CloseIcon
            className='cursor-pointer absolute top-[25px] right-[25px]'
            onClick={onDismiss}
          />
        </div>
      </div>
    </dialog>
  );
}
