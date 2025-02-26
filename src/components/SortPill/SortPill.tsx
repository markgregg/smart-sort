import React, { useMemo } from 'react';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { useConfig, useSort, useSortDrag } from '@/state/useState';
import {
  COMPACT_PILL_HEIGHT,
  DEFAULT_SORT_PILL_WIDTH,
  LARGE_PILL_HEIGHT,
  NORMAL_PILL_HEIGHT,
} from '@/util/constants';
import { Colours } from '@/util/colours';
import { Sort } from '@/types';
import { CloseButton } from '../CloseButton';
import { Button } from '../common/Button';
import s from './style.module.less';

interface SortPillProps {
  sortItem: Sort;
  index: number;
}

export const SortPill = React.memo(({ sortItem, index }: SortPillProps) => {
  const { field, sortDirection } = sortItem;
  const {
    size = 'normal',
    sortPillWidth: maxWidth = DEFAULT_SORT_PILL_WIDTH,
    fieldMap,
  } = useConfig((state) => state);
  const { updateSort, removeSort, moveTo } = useSort((state) => state);
  const {
    draggedItem,
    dragOverItem,
    setDragItem,
    setDraggedOverItem,
    clearDragOverItem,
    clearItems,
  } = useSortDrag((state) => state);
  const [mouseOver, setMouseOver] = React.useState<boolean>(false);

  const pillHeight =
    size === 'normal'
      ? NORMAL_PILL_HEIGHT
      : size === 'compact'
        ? COMPACT_PILL_HEIGHT
        : LARGE_PILL_HEIGHT;

  const fieldTitle = useMemo(
    () => fieldMap.get(field)?.title ?? field,
    [field, fieldMap],
  );

  const backgroundColor = React.useMemo(() => {
    if (mouseOver) {
      return Colours.backgrounds.hover;
    }
    return Colours.backgrounds.standard;
  }, [mouseOver]);

  const handleMouseEnter = React.useCallback(() => {
    setMouseOver(true);
  }, [setMouseOver]);

  const handleMouseLeave = React.useCallback(() => {
    setMouseOver(false);
  }, [setMouseOver]);

  const handleDeleteSortField = React.useCallback(() => {
    removeSort(field);
  }, [field]);

  const handleChangeSortDirection = React.useCallback(() => {
    updateSort(field, sortDirection === 'asc' ? 'desc' : 'asc');
  }, [field, sortDirection]);

  const handleDragStart = React.useCallback(
    (event: React.DragEvent) => {
      if (!draggedItem || draggedItem.item.field !== sortItem.field) {
        setDragItem(sortItem, index);
        event.stopPropagation();
      }
    },
    [sortItem, draggedItem, setDragItem],
  );

  const handleDragOver = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (draggedItem) {
        const bounds = event.currentTarget.getBoundingClientRect();
        const position =
          bounds.left + bounds.width / 2 > event.clientX ? 'before' : 'after';
        if (draggedItem.item.field !== sortItem.field) {
          if (
            !dragOverItem ||
            dragOverItem.item.field !== sortItem.field ||
            dragOverItem.position !== position
          ) {
            setDraggedOverItem(sortItem, index, position);
          }
          event.dataTransfer.dropEffect = 'move';
          event.preventDefault();
        } else {
          clearDragOverItem();
        }
      }
    },
    [draggedItem, dragOverItem, sortItem, index, setDraggedOverItem],
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent) => {
      if (dragOverItem && draggedItem) {
        moveTo(
          draggedItem.index,
          dragOverItem.index,
          dragOverItem.position ?? 'before',
        );
      }
      clearItems();
      event.stopPropagation();
    },
    [draggedItem, dragOverItem, clearItems, moveTo],
  );

  const handleDragEnd = React.useCallback(
    (event: React.DragEvent) => {
      clearItems();
      event.stopPropagation();
    },
    [clearItems],
  );

  return (
    <div
      id="sf-sort-pill"
      className={s.sortPill}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      {dragOverItem?.item?.field === sortItem.field &&
        dragOverItem?.position === 'before' && (
          <div className={s.leftInsert} style={{ height: pillHeight * 0.8 }} />
        )}
      <div
        className={[s.sortPillBody, s[size]].join(' ')}
        style={{
          backgroundColor,
          maxWidth,
        }}
      >
        <div className={s.sortText}>{fieldTitle}</div>
        <div className={s.sortIcon}>
          <Button
            onClick={handleChangeSortDirection}
            height={16}
            width={16}
            color={Colours.buttons.sort}
            backgroundColor={Colours.buttons.sortBackground}
            hoverColor={Colours.buttons.sortHover}
            hoverBackgroundColor={Colours.buttons.sortHoverBackground}
            style={{
              alignSelf: 'center',
              marginLeft: '3px',
              paddingBlock: 0,
              paddingInline: 0,
            }}
          >
            {sortDirection === 'asc' ? <RiSortAsc /> : <RiSortDesc />}
          </Button>
          {mouseOver && <CloseButton onClick={handleDeleteSortField} />}
        </div>
      </div>
      {dragOverItem?.item?.field === sortItem.field &&
        dragOverItem?.position === 'after' && (
          <div className={s.rightInsert} style={{ height: pillHeight * 0.8 }} />
        )}
    </div>
  );
});
