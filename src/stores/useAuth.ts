import { create } from "zustand";

import { AuthInput, User, UserSettings } from "../models";
import { login, refresh, getSelf } from "../services/auth.service";
import { updateSettings } from "../services/settings.service";

interface AuthState {
  access: string | null;
  loading: boolean;
  errorLogin: boolean;
  errorRefresh: boolean;
  user: User | null;
  settings: UserSettings | null;
  getAccess: (loginData: AuthInput) => void;
  refreshAccess: () => Promise<void>;
  getSelfData: () => Promise<void>;
  toggleHideCompleted: (newSettings: UserSettings) => Promise<void>;
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  access: null,
  loading: false,
  errorLogin: false,
  errorRefresh: false,
  settings: null,

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

  getSelfData: async () => {
    set({ loading: true });
    try {
      const response = await getSelf();
      set({ user: response, settings: response.settings });
    } catch (e) {
      console.error(e);
    } finally {
      set({ loading: false });
    }
  },

  toggleHideCompleted: async (newSettings: UserSettings) => {
    set({ loading: true });
    try {
      const result = await updateSettings(newSettings);
      set({ settings: result });
    } catch (e) {
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuth;
