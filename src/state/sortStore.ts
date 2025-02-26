import { StoreApi, UseBoundStore, create } from 'zustand';
import { Sort, SortDirection } from '..';
import { SortState } from '@/types/State/sort';
import { DROP_POSITION } from '@/types/State';

export const createSortStore = (): UseBoundStore<StoreApi<SortState>> =>
  create<SortState>((set) => ({
    sort: [],
    setSort: (sort: Sort[]) => set({ sort }),
    updateSort: (field: string, sortDirection: SortDirection) =>
      set((state) => {
        const { sort } = state;
        const exisitng = state.sort.find((s) => s.field === field);
        return {
          sort:
            exisitng?.sortDirection === sortDirection
              ? sort.filter((s) => s.field !== field)
              : exisitng
                ? sort.map((s) =>
                    s.field === field ? { ...s, sortDirection } : s,
                  )
                : [
                    ...sort,
                    { field, sortDirection, sortIndex: state.sort.length },
                  ],
        };
      }),
    removeSort: (field: string) =>
      set((state) => {
        const sort = state.sort.filter((s) => s.field !== field);
        return {
          sort: sort.map((s, i) => ({ ...s, sortIndex: i })),
        };
      }),
    clearSort: () =>
      set(() => ({
        sort: [],
        active: false,
      })),
    moveTo: (from: number, to: number, position: DROP_POSITION) =>
      set((state) => {
        const { sort: currentSort } = state;
        if (
          from >= 0 &&
          from < currentSort.length &&
          to >= 0 &&
          to < currentSort.length
        ) {
          const sortItem = currentSort[from];
          const toPos = position === 'before' ? to : to + 1;
          if (from > to) {
            currentSort.splice(from, 1);
            currentSort.splice(toPos, 0, sortItem);
          } else {
            currentSort.splice(toPos, 0, sortItem);
            currentSort.splice(from, 1);
          }
          const sort = [...currentSort];
          return { sort: sort.map((s, i) => ({ ...s, sortIndex: i })) };
        }
        return {};
      }),
  }));
