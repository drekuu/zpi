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
  userData?: UserDataState;
  photograph?: PhotographState;
}

interface UserActions {
  setUserData: (state: UserDataState) => void;
  setPhotograph: (state: PhotographState) => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        userData: undefined,
        photograph: undefined,
        setUserData: (state: UserDataState) => set({ userData: state }),
        setPhotograph: (state: PhotographState) => set({ photograph: state }),
      }),
      { name: 'user', storage: createJSONStorage(() => localStorage) },
    ),
  ),
);
