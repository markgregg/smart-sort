import { SmartSortProps } from './SmartSortProps';
import { AgField } from './agField';
import { ColumnApi, GridApi } from './agGrid';

export type FilterFunction = (row: any) => boolean;

export type SmartSortAgGridProps = Omit<SmartSortProps, 'fields'> & {
  /* field overrides */
  fields?: AgField[];
  /* ag-grid api */
  gridApi: GridApi | null;
  /* ag-grid column api */
  columnApi: ColumnApi | null;
};
