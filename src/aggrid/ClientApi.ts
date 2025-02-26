import { Column, ColumnApi, GridApi } from '@/types/agGrid';
import { Sort } from '..';

export type FilterValueGetter = (params: any) => any | null | undefined;

export interface ClientApi {
  getAgColumn: (column: string) => Column | null;
  getAgColumns: () => Column[] | null;
  applySort: (sort: Sort[]) => void;
}

export const createClientApi = (
  gridApi: GridApi | null,
  columnApi: ColumnApi | null,
): ClientApi | null => {
  if (!gridApi) {
    return null;
  }

  const getAgColumn = (column: string): Column | null =>
    'getColumn' in gridApi
      ? (gridApi.getColumn(column) ?? null)
      : (columnApi?.getColumn(column) ?? null);

  const getAgColumns = (): Column[] | null =>
    'getColumns' in gridApi
      ? (gridApi.getColumns() ?? null)
      : (columnApi?.getColumns() ?? null);

  const applySort = (sort: Sort[]) => {
    const columnState =
      'getColumnState' in gridApi
        ? (gridApi.getColumnState() ?? null)
        : columnApi?.getColumnState();
    if (columnState) {
      const fieldState = sort.map((sortField, index) => ({ sortField, index }));
      const newColumnState = columnState.map((cs) => {
        const entry = fieldState.find((f) => f.sortField.field === cs.colId);
        return {
          ...cs,
          sort: entry?.sortField.sortDirection ?? null,
          sortIndex: entry?.index ?? 0,
        };
      });

      if ('applyColumnState' in gridApi) {
        gridApi.applyColumnState({ state: newColumnState });
      } else {
        columnApi?.applyColumnState({ state: newColumnState });
      }
    }
  };

  return {
    getAgColumn,
    getAgColumns,
    applySort,
  };
};
