import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  name: string;
  isAdmin: boolean;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      login: (user) => {
        set({ isLoggedIn: true, user });
        Cookies.set('auth', 'true', { expires: 7 });
        Cookies.set('isAdmin', user.isAdmin ? 'true' : 'false', { expires: 7 });
      },

      logout: () => {
        set({ isLoggedIn: false, user: null });
        Cookies.remove('auth');
        Cookies.remove('isAdmin');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn, user: state.user }),
    }
  )
);