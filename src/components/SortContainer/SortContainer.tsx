import React from 'react';
import { useSort } from '@/state/useState';
import { SortPill } from '../SortPill';
import s from './style.module.less';

export const SortContainer = React.memo(() => {
  const sort = useSort((state) => state.sort);
  return (
    <div id="sf-sort-container" className={s.sortContainer}>
      {sort.map((si, i) => (
        <SortPill sortItem={si} key={s.field} index={i} />
      ))}
    </div>
  );
});
