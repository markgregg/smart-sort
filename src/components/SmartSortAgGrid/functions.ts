import { ClientApi } from '@/aggrid/ClientApi';
import { Field } from '@/types';
import { AgField } from '@/types/agField';

export const convertToheader = (field?: string): string => {
  const header = field?.includes('.')
    ? field.split('.').find((_, i, a) => i === a.length - 1)
    : field;
  return header?.replace(/^./, (str) => str.toUpperCase()) ?? 'Unknown';
};

export const constructFields = (
  agClientApi: ClientApi | null,
  fields?: AgField[],
): Field[] | null => {
  if (agClientApi) {
    const columns = agClientApi?.getAgColumns() ?? [];
    if (columns) {
      return columns
        .map((col) => {
          const { field, colId, headerName } = col.getColDef();
          const fieldOverides = fields?.find(
            (f) => f.name === (colId ?? field),
          );
          const fieldName = colId ?? field;
          const overriddenField = {
            name: fieldName ?? '',
            title: headerName ?? convertToheader(field),
            ...fieldOverides,
          };
          return overriddenField;
        })
        .filter((f) => f.name !== undefined && !f.exclude);
    }
  }
  return null;
};
