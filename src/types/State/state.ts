import { StoreApi, UseBoundStore } from 'zustand';
import { ConfigState } from './config';
import { DragState } from './drag';
import { SortState } from './sort';
import { Sort } from '../sort';
import { ManagedState } from './managed';

export interface State {
  configStore: UseBoundStore<StoreApi<ConfigState>>;
  sortStore: UseBoundStore<StoreApi<SortState>>;
  sortDragStore: UseBoundStore<StoreApi<DragState<Sort>>>;
  managedStore: UseBoundStore<StoreApi<ManagedState>>;
}
