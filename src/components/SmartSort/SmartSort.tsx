import React from 'react';
import { SmartSortProps } from '@/types';
import { SortBar } from '../SortBar';
import { StateProvider } from '../../state/StateProvider';

export const SmartSort = React.memo((props: SmartSortProps) => (
  <StateProvider props={props}>
    <SortBar />
  </StateProvider>
));
