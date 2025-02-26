import React from 'react';
import { BiSort } from 'react-icons/bi';
import { useConfig, useSort } from '@/state/useState';
import { Tooltip } from '@/components/common/Tooltip';
import { SortOption } from './SortOption';
import { SortDirection } from '@/types/sort';
import { ignoreCaseCompare } from '@/util/functions';
import s from './style.module.less';
import { COMPACT_HEIGHT, LARGE_HEIGHT, NORMAL_HEIGHT } from '@/util/constants';

export const SortFieldSelection = React.memo(() => {
  const [filter, setFilter] = React.useState<string>('');
  const [showFields, setShowFields] = React.useState<boolean>(false);
  const [left, setLeft] = React.useState<number>(-26);
  const { fields, size = 'normal' } = useConfig((state) => state);
  const { updateSort } = useSort((state) => state);

  const buttonHeight =
    size === 'normal'
      ? NORMAL_HEIGHT - 2
      : size === 'compact'
        ? COMPACT_HEIGHT - 2
        : LARGE_HEIGHT - 2;

  const filteredFields = React.useMemo(
    () => fields.filter((f) => ignoreCaseCompare(f.title, filter)),
    [fields, filter],
  );

  const handleShowFields = React.useCallback(() => {
    setShowFields(true);
  }, [setShowFields]);

  const handleHideFields = React.useCallback(() => {
    setShowFields(false);
    setFilter('');
  }, [setShowFields, setFilter]);

  const handleAddSort = React.useCallback(
    (field: string, sortDirection: SortDirection) => {
      updateSort(field, sortDirection);
    },
    [updateSort],
  );

  const handleChanged = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(event.currentTarget.value);
    },
    [setFilter],
  );

  const handleSetLeft = React.useCallback(
    (ref: HTMLDivElement | null) => {
      if (ref) {
        setLeft((ref.offsetWidth - 26) * -1);
      }
    },
    [setFilter],
  );

  return (
    <div className={s.sortFieldSelection} onMouseLeave={handleHideFields}>
      <Tooltip caption="Add Sort Field">
        <div
          id="sf-sort-selection-button"
          className={s.addFieldIcon}
          onMouseEnter={handleShowFields}
          style={{
            height: buttonHeight,
            backgroundColor: showFields ? '#DDDDDD' : undefined,
          }}
        >
          <BiSort />
        </div>
      </Tooltip>
      {showFields && (
        <div
          ref={handleSetLeft}
          className={[s.filterSelectionPopup, s[size]].join(' ')}
          style={{
            left,
          }}
        >
          <div className={s.filter}>
            <label htmlFor="fields-filter">
              Filter:
              <input
                id="fields-filter"
                value={filter}
                onChange={handleChanged}
              />
            </label>
          </div>
          <div className={s.fields}>
            {filteredFields.map((f) => (
              <SortOption key={f.name} field={f} onSelect={handleAddSort} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
