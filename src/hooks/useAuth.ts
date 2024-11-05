import { create } from 'zustand';
import { User } from '../types/User';

type AuthStore = {
  user: User | null
  setUser: (user: User) => void
};


const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user: user})),
}));

const useUser = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  return {user, setUser};
};

export {
  useUser,
};
