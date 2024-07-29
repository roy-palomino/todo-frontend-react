import { create } from "zustand";

import { AuthInput } from "../models";
import { login, refresh } from "../services/auth.service";

interface AuthState {
  access: string | null;
  loading: boolean;
  errorLogin: boolean;
  errorRefresh: boolean;
  getAccess: (loginData: AuthInput) => void;
  refreshAccess: () => void;
}

const useAuth = create<AuthState>((set) => ({
  access: null,
  loading: false,
  errorLogin: false,
  errorRefresh: false,

  getAccess: async (loginData: AuthInput) => {
    set({ loading: true, errorLogin: false });
    try {
      const { access } = await login(loginData);
      set({ access, errorLogin: false });
    } catch (_) {
      set({ errorLogin: true });
    } finally {
      set({ loading: false });
    }
  },

  refreshAccess: async () => {
    set({ loading: true, errorRefresh: false });
    try {
      const { access } = await refresh();
      set({ access });
    } catch (e) {
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuth;
