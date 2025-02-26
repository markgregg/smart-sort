import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import Bond, {
  columns,
  constructSort,
  fields,
} from '@/stories/smartFilterFunctions';
import { SmartSort as SmartFilterComponent, Sort } from '../../..';
import { getQueryParams } from '@/TestApp/functions';
import s from './style.module.less';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { deterministicTestData } from '../../../../data/bonds';

export const SmartFilter = () => {
  const queryParams = getQueryParams();
  const [rowData, setRowData] = React.useState<Bond[]>(deterministicTestData);
  const [columnDefs] = React.useState<ColDef<Bond>[]>(columns);
  const [sort, setSort] = React.useState<Sort[]>([]);

  const handleSortChange = React.useCallback(
    (newSort: Sort[]) => {
      setSort(newSort);
    },
    [setSort],
  );

  React.useEffect(() => {
    const data = [...deterministicTestData];
    const sortFunc = constructSort(sort);
    if (sortFunc) {
      data.sort(sortFunc);
    }
    setRowData(data);
  }, [sort, setRowData]);

  const style = queryParams.width
    ? { width: `${queryParams.width}px` }
    : undefined;

  const size = queryParams.size ?? 'normal';

  return (
    <div className={s.smartFilterPage}>
      <h4>Smart Filter</h4>
      <div className={s.filterBar} style={style}>
        <SmartFilterComponent
          sort={sort}
          onSortChange={handleSortChange}
          fields={fields}
          size={size}
        />
      </div>
      <div className={[s.grid, 'ag-theme-alpine'].join(' ')}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};
