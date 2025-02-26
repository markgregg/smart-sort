import React from 'react';
import { SmartSortAgGridProps } from '@/types/SmartSortAgGridProps';
import { createClientApi } from '@/aggrid/ClientApi';
import { Field, Sort } from '@/types';
import { constructFields } from './functions';
import { SmartSort } from '../SmartSort/SmartSort';

export const SmartSortAgGrid = React.memo((props: SmartSortAgGridProps) => {
  const { gridApi, columnApi, onSortChange, sort, fields } = props;

  const agClientApi = React.useMemo(
    () => createClientApi(gridApi, columnApi),
    [gridApi, columnApi],
  );

  React.useEffect(() => {
    if (agClientApi && sort) {
      agClientApi.applySort(sort);
    }
  }, [sort, agClientApi]);

  const { overriddenFields } = React.useMemo<{
    overriddenFields: Field[];
  }>(() => {
    const autoFields = constructFields(agClientApi, fields) ?? [];
    return {
      overriddenFields: [
        ...autoFields,
        ...((fields?.filter(
          (f) => !autoFields?.find((a) => a.name === f.name),
        ) as Field[]) ?? []),
      ],
    };
  }, [fields, agClientApi]);

  const handleSortChanged = React.useCallback(
    (s: Sort[]) => {
      if (agClientApi) {
        agClientApi.applySort(s);
        if (onSortChange) {
          onSortChange(s);
        }
      }
    },
    [agClientApi, onSortChange],
  );

  return (
    <SmartSort
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
      fields={overriddenFields}
      onSortChange={handleSortChanged}
    />
  );
});
