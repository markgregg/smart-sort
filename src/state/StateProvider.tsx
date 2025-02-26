import React from 'react';
import { createConfigStore } from './configStore';
import { StateContext } from '@/state/state';
import { SmartSortProps, Sort } from '@/types';
import { createMatcherDragStore } from './dragStore';
import { createSortStore } from './sortStore';
import { createManagedStore } from './managedStore';

export interface ProviderProps {
  props: SmartSortProps;
  children: JSX.Element | JSX.Element[];
}

export const StateProvider = React.memo(
  ({ props, children }: ProviderProps) => {
    const {
      sort,
      dropdownWidth,
      fields,
      maxDropdownHeight,
      onClear,
      onSortChange,
      size,
      sortPillWidth,
      sortOptionWidth,
    } = props;
    const configStore = React.useMemo(
      () => createConfigStore(props),
      [
        dropdownWidth,
        fields,
        maxDropdownHeight,
        onClear,
        onSortChange,
        size,
        sortPillWidth,
        sortOptionWidth,
      ],
    );
    const sortStore = React.useMemo(createSortStore, []);
    const sortDragStore = React.useMemo(
      () => createMatcherDragStore<Sort>(),
      [],
    );
    const managedStore = React.useMemo(
      () => createManagedStore(sort ?? []),
      [sort],
    );

    const stateValue = React.useMemo(
      () => ({
        configStore,
        sortStore,
        sortDragStore,
        managedStore,
      }),
      [configStore, sortStore, sortDragStore, managedStore],
    );

    return (
      <StateContext.Provider value={stateValue}>
        {children}
      </StateContext.Provider>
    );
  },
);
