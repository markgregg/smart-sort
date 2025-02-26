import { StoreApi, UseBoundStore, create } from 'zustand';
import { Sort } from '@/types';
import { ManagedState } from '@/types/State';

export const createManagedStore = (
  sort?: Sort[],
): UseBoundStore<StoreApi<ManagedState>> =>
  create<ManagedState>(() => ({
    sort,
  }));
