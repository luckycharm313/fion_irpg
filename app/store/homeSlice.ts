import { StateCreator } from 'zustand';

export interface IHomeSlice {
  localURL: string;
  setLocalURL: (localURL: string) => void;
}

export const homeSlice: StateCreator<IHomeSlice> = set => ({
  localURL: '',
  setLocalURL: (localURL): void => {
    set({ localURL });
  },
});
