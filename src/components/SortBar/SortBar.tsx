import React from 'react';
import { SortContainer } from '../SortContainer';
import { useConfig, useSort } from '../../state/useState';
import { SortFieldSelection } from '../SortFieldSelection';
import s from './style.module.less';

export const SortBar = React.memo(() => {
  const sortBar = React.useRef<HTMLDivElement | null>(null);
  const { size = 'normal', onSortChange } = useConfig((state) => state);
  const sort = useSort((state) => state.sort);

  React.useEffect(() => {
    if (onSortChange) {
      onSortChange(sort);
    }
  }, [sort, onSortChange]);

  return (
    <div
      id="sf-sort-bar"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      ref={sortBar}
      className={[s.sortBar, s[size], s[`font-${size}`]].join(' ')}
    >
      <div
        id="sf-inner-filter-bar"
        className={[s.sortBarInner, s[size]].join(' ')}
      >
        <SortContainer />
        <SortFieldSelection />
      </div>
    </div>
  );
});
