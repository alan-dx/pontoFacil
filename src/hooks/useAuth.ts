import { create } from 'zustand';
import { User } from '../types/User';

type AuthStore = {
  user: User | null
  setUser: (user: User) => void
  signOut: () => void
};


const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user: user})),
  signOut: () => set(() => ({ user: null})),
}));

const useUser = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const signOut = useAuthStore(state => state.signOut);

  return {user, setUser, signOut};
};

export {
  useUser,
};
