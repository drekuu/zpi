import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ReactElement } from 'react';
import { BasePopupProps } from '@/components/Popup/Popup';

interface PopupState {
  popups: Array<ReactElement<BasePopupProps>>;
}

interface PopupActions {
  pushPopup: (popup: ReactElement<BasePopupProps>) => void;
  popPopup: () => void;
  isOpen: () => boolean;
}

type PopupStore = PopupState & PopupActions;

export const usePopupStore = create<PopupStore>()(
  devtools(
    immer(
      (set, get): PopupStore => ({
        popups: [],
        pushPopup: (popup: ReactElement<BasePopupProps>) =>
          set((state) => {
            state.popups.push(popup);
          }),
        popPopup: () =>
          set((state) => {
            state.popups.shift();
          }),
        isOpen: () => get().popups.length !== 0,
      }),
    ),
  ),
);
