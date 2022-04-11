import AsyncStorage from '@react-native-community/async-storage';
import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';
import { homeSlice, IHomeSlice } from './homeSlice';

interface IStore extends IHomeSlice {}

/**
 * Make sure to enforce type for each slice
 */

export const useStore = create<IStore>(
  persist(
    (set, get, api) => ({
      ...homeSlice(
        set as unknown as SetState<IHomeSlice>,
        get as GetState<IHomeSlice>,
        api as unknown as StoreApi<IHomeSlice>,
      ),      
    }),
    {
      name: 'app-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
