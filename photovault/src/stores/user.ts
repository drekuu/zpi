import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { UserData } from '@/models/user';

interface UserState {
  loggedIn: boolean;
  userData?: UserData;
}

interface UserActions {
  setLoggedIn: (state: boolean) => void;
  setUserData: (state: UserData) => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set): UserStore => ({
        loggedIn: false,
        userData: undefined,
        setLoggedIn: (state: boolean) => set({ loggedIn: state }),
        setUserData: (state: UserData) => set({ userData: state }),
      }),
      { name: 'user', storage: createJSONStorage(() => localStorage) },
    ),
  ),
);
