'use client';

import { usePopupStore } from '@/stores/popup';

export default function PopupController() {
  const popups = usePopupStore((store) => store.popups);
  const popup = popups?.[0];
  const pop = usePopupStore((store) => store.popPopup);
  const onClose = () => {
    pop();
  };

  return popup ? (
    <popup.type
      {...popup.props}
      onClose={() => {
        onClose();
      }}
    />
  ) : (
    <></>
  );
}
