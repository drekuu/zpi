'use client';

import { ComponentType, ElementRef, useEffect, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import CloseIcon from '@/../public/icons/close.svg';

export interface BasePopupProps {
  onClose?: () => void;
}

export interface PopupProps {
  close?: () => void;
}

export default function withPopup<AdditionalProps>(
  Component: ComponentType<PopupProps & AdditionalProps>,
) {
  return function Popup(props: BasePopupProps & AdditionalProps) {
    const dialogRef = useRef<ElementRef<'dialog'>>(null);
    const contentRef = useRef<ElementRef<'div'>>(null);

    const onDismiss = () => {
      dialogRef.current?.close();
      props.onClose?.();
    };

    useEffect(() => {
      dialogRef.current?.showModal();
    }, []);

    useOnClickOutside(contentRef, onDismiss);

    return (
      <dialog
        ref={dialogRef}
        className='fixed top-0 left-0 backdrop:backdrop-blur-sm w-11/12 max-w-[500px] m-auto rounded-xl overflow-clip py-8 px-6'
        onClose={onDismiss}
      >
        <div className='w-full h-full overflow-y-auto' ref={contentRef}>
          <div>
            <Component close={onDismiss} {...props} />
            <CloseIcon
              className='cursor-pointer absolute top-[10px] right-[10px]'
              onClick={onDismiss}
            />
          </div>
        </div>
      </dialog>
    );
  };
}
