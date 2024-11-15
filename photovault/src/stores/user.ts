import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface PhotographState {
  description: string | null;
}

interface UserDataState {
  email: string;
  username: string;
}

interface UserState {
  loggedIn: boolean;
  userData?: UserDataState;
  photograph?: PhotographState;
}

interface UserActions {
  setLoggedIn: (state: boolean) => void;
  setUserData: (state: UserDataState) => void;
  setPhotograph: (state: PhotographState) => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        loggedIn: false,
        userData: undefined,
        photograph: undefined,
        setLoggedIn: (state: boolean) => set({ loggedIn: state }),
        setUserData: (state: UserDataState) => set({ userData: state }),
        setPhotograph: (state: PhotographState) => set({ photograph: state }),
      }),
      { name: 'user', storage: createJSONStorage(() => localStorage) },
    ),
  ),
);
