import React from 'react';
import { StoreApi, UseBoundStore, useStore } from 'zustand';
import { StateContext } from '@/state/state';
import { ConfigState, DragState, ManagedState, State } from '@/types/State';
import { Sort } from '@/types';
import { SortState } from '@/types/State/sort';

const useState = <T, U>(
  storeSelector: (state: State) => UseBoundStore<StoreApi<T>>,
  selector: (state: T) => U,
) => {
  const store = storeSelector(React.useContext(StateContext));

  if (store === null) {
    throw new Error('useState must be used within StateProvider');
  }
  return useStore<UseBoundStore<StoreApi<T>>, U>(store, selector);
};

export const useConfig = <U>(selector: (state: ConfigState) => U) =>
  useState((s) => s.configStore, selector);

export const useSort = <U>(selector: (state: SortState) => U) =>
  useState((s) => s.sortStore, selector);

export const useSortDrag = <U>(selector: (state: DragState<Sort>) => U) =>
  useState((s) => s.sortDragStore, selector);

export const useManaged = <U>(selector: (state: ManagedState) => U) =>
  useState((s) => s.managedStore, selector);
