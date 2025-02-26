import { StoreApi, UseBoundStore, create } from 'zustand';
import { SmartSortProps } from '@/types';
import { ConfigState } from '@/types/State';

export const createConfigStore = ({
  onSortChange,
  onClear,
  size,
  maxDropdownHeight,
  dropdownWidth,
  fields,
  sortPillWidth,
  sortOptionWidth,
}: SmartSortProps): UseBoundStore<StoreApi<ConfigState>> =>
  create<ConfigState>(() => ({
    onSortChange,
    onClear,
    size: size ?? 'normal',
    maxDropdownHeight,
    dropdownWidth,
    fields,
    fieldMap: new Map(fields.map((f) => [f.name, f])),
    sortPillWidth,
    sortOptionWidth,
  }));
