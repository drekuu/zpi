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
import { usePopupStore } from '@/stores/popup';

interface ModalProps {
  children: ReactNode;
}

/**
 * Modal is a type of popup that is accessed through a URL
 */
export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);
  const contentRef = useRef<ElementRef<'div'>>(null);
  const isPopupOpen = usePopupStore((store) => store.isOpen);

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

  useOnClickOutside(contentRef, () => {
    if (!isPopupOpen()) {
      onDismiss();
    }
  });

  return (
    <dialog
      ref={dialogRef}
      className='fixed top-0 left-0 backdrop:backdrop-blur-sm w-11/12 h-5/6 max-w-[1000px] m-auto rounded-4xl overflow-clip py-16 px-8'
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
