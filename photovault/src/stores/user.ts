import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  loggedIn: boolean;
}

interface UserActions {
  setLoggedIn: (state: boolean) => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        loggedIn: false,
        setLoggedIn: (state: boolean) => set({ loggedIn: state }),
      }),
      { name: 'user', storage: createJSONStorage(() => localStorage) },
    ),
  ),
);
