import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Sort } from '@/types';
import Bond, { columns } from '@/stories/smartFilterFunctions';
import { deterministicTestData } from '../../../../data/bonds';
import { SmartSortAgGrid as SmartFilterAgGridCompoent } from '@/components';
import { getQueryParams } from '@/TestApp/functions';
import s from './style.module.less';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const SmartFilterAgGrid = () => {
  const queryParams = getQueryParams();
  const [gridApi, setGridApi] = React.useState<GridApi<Bond> | null>(null);
  const [columnApi, setColumnApi] = React.useState<ColumnApi | null>(null);
  const [rowData] = React.useState<Bond[]>(deterministicTestData);
  const [columnDefs] = React.useState<ColDef<Bond>[]>(columns);
  const [sort, setSort] = React.useState<Sort[]>([]);

  const handleSortChange = React.useCallback(
    (newSort: Sort[]) => {
      setSort(newSort);
    },
    [setSort, columnApi],
  );

  const handleGridReady = (event: GridReadyEvent<Bond>) => {
    setGridApi(event.api);
    setColumnApi(event.columnApi);
  };

  const style = queryParams.width
    ? { width: `${queryParams.width}px` }
    : undefined;

  const size = queryParams.size ?? 'normal';

  return (
    <div className={s.smartFilterAgGridPage}>
      <h4>Smart Filter AgGrid</h4>
      <div className={s.filterBar} style={style}>
        <SmartFilterAgGridCompoent
          sort={sort}
          onSortChange={handleSortChange}
          size={size}
          gridApi={gridApi}
          columnApi={columnApi}
        />
      </div>
      <div id="sf-ag-grid" className={[s.grid, 'ag-theme-alpine'].join(' ')}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={handleGridReady}
        />
      </div>
    </div>
  );
};
