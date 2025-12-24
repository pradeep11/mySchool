import { create } from 'zustand';
import { configService } from '../services/ConfigService';

export type ScreenName = 'login' | 'home' | 'updates' | 'details' | 'info' | 'help&Support' | 'settings&Privacy' | 'appVersion';

export interface GenericItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface AppState {
  isLoggedIn: boolean;
  currentScreen: ScreenName;
  items: GenericItem[];
  selectedItem?: GenericItem | null;
  drawerOpen: boolean;
  appVersion: string;
  adminName: string;
  organisationName: string;
  login: () => void;
  logout: () => void;
  navigate: (screen: ScreenName) => void;
  selectItem: (item?: GenericItem | null) => void;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

const getInitialData = () => {
  const config = configService.getConfig();
  return {
    items: config.screens.details.items,
    appVersion: '1.0.0',
    adminName: config.screens.home.adminName,
    organisationName: config.screens.home.organisationName,
  };
};

const initialData = getInitialData();
console.log('[AppStore] Initial Data:', initialData);

export const useAppStore = create<AppState>((set) => ({
  isLoggedIn: false,
  currentScreen: 'login',
  items: initialData.items,
  selectedItem: null,
  drawerOpen: false,
  appVersion: initialData.appVersion,
  adminName: initialData.adminName,
  organisationName: initialData.organisationName,
  login: () => {
    console.log('[AppStore] login() called');
    set({ isLoggedIn: true, currentScreen: 'home' });
  },
  logout: () => {
    set({ isLoggedIn: false, currentScreen: 'login', selectedItem: null });
  },
  navigate: (screen: ScreenName) => {
    set({ currentScreen: screen });
  },
  selectItem: (item?: GenericItem | null) => {
    set({ selectedItem: item ?? null });
  },
  toggleDrawer: () => {
    set((state) => ({ drawerOpen: !state.drawerOpen }));
  },
  closeDrawer: () => {
    set({ drawerOpen: false });
  },
}));