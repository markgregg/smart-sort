import dayjs from 'dayjs';
import { ColDef } from 'ag-grid-community';
import { Field, Sort, SortDirection } from '..';

export type SortFunction = (x: any, y: any) => number;

export default interface Bond {
  isin: string;
  currency: string;
  issueDate: string;
  maturityDate: string;
  price: number;
  size: number;
  side: string;
  coupon: number;
  issuer: string;
  hairCut: number;
  active: boolean;
  categories: {
    type: string;
    sector: string;
  };
}

export const fields: Field[] = [
  {
    name: 'isin',
    title: 'ISIN',
  },
  {
    name: 'side',
    title: 'Side',
  },
  {
    name: 'currency',
    title: 'CCY',
  },
  {
    name: 'issueDate',
    title: 'IssueDate',
  },
  {
    name: 'maturityDate',
    title: 'MaturityDate',
  },
  {
    name: 'coupon',
    title: 'Coupon',
  },
  {
    name: 'issuer',
    title: 'Issuer',
  },
  {
    name: 'hairCut',
    title: 'Hair Cut',
  },
  {
    name: 'active',
    title: 'Active',
  },
  {
    name: 'sector',
    title: 'Sector',
  },
];

export const constructSort = (sort: Sort[]): SortFunction | null => {
  let currentSort: SortFunction | null = null;

  for (let i = 0; i < sort.length; i += 1) {
    if (!currentSort) {
      currentSort = createSortFunction(sort[i]);
    } else {
      const existingSort = currentSort as SortFunction;
      const newSort = createSortFunction(sort[i]);
      if (newSort) {
        currentSort = (x, y) => {
          const srt = existingSort(x, y);
          return srt === 0 ? newSort(x, y) : srt;
        };
      } else {
        currentSort = existingSort;
      }
    }
  }
  return currentSort;
};

const createSortFunction = (sortItem: Sort): SortFunction | null => {
  let sortFunc: SortFunction | null = null;
  const createSortFunc =
    (
      type: string,
      sortDirection: SortDirection,
      getter: (bond: Bond) => any,
    ): SortFunction =>
    (x, y) => {
      const valX = getter(x);
      const valY = getter(y);
      // eslint-disable-next-line valid-typeof
      if (typeof valX !== type) {
        return 1;
      }
      // eslint-disable-next-line valid-typeof
      if (typeof valY !== type) {
        return -1;
      }
      return valX === valY
        ? 0
        : valX > valY
          ? sortDirection === 'asc'
            ? 1
            : -1
          : sortDirection === 'asc'
            ? -1
            : 1;
    };

  switch (sortItem.field) {
    case 'isin':
    case 'side':
    case 'currency':
    case 'issuer':
      sortFunc = createSortFunc(
        'string',
        sortItem.sortDirection,
        (bond: any) => bond[sortItem.field],
      );
      break;
    case 'sector':
      sortFunc = createSortFunc(
        'string',
        sortItem.sortDirection,
        (bond: Bond) => bond.categories.sector,
      );
      break;
    case 'coupon':
    case 'haircut':
      sortFunc = createSortFunc(
        'number',
        sortItem.sortDirection,
        (bond: any) => bond[sortItem.field],
      );
      break;
    case 'maturityDate':
    case 'issueDate':
      sortFunc = (x: any, y: any) => {
        const valX = x[sortItem.field];
        const valY = y[sortItem.field];
        if (typeof valX !== 'string') {
          return 1;
        }
        if (typeof valY !== 'string') {
          return -1;
        }
        const valXDate = dayjs(valX, 'YYYY-MM-DD', true);
        const valYDate = dayjs(valY, 'YYYY-MM-DD', true);
        return valXDate.isBefore(valYDate)
          ? sortItem.sortDirection === 'asc'
            ? -1
            : 1
          : valXDate.isAfter(valYDate)
            ? sortItem.sortDirection === 'asc'
              ? 1
              : -1
            : 0;
      };
      break;
    case 'active':
      sortFunc = createSortFunc(
        'boolean',
        sortItem.sortDirection,
        (bond: Bond) => bond.active,
      );
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(`Not mappibng for field: ${sortItem.field}`);
      sortFunc = null;
      break;
  }
  return sortFunc;
};

export const columns: ColDef<Bond>[] = [
  {
    field: 'isin',
    sortable: true,
    resizable: true,
    cellDataType: 'text',
  },
  {
    field: 'side',
    sortable: true,
    resizable: true,
    cellDataType: 'text',
  },
  {
    field: 'currency',
    sortable: true,
    resizable: true,
    cellDataType: 'text',
  },
  {
    field: 'issueDate',
    sortable: true,
    resizable: true,
  },
  {
    field: 'maturityDate',
    sortable: true,
    resizable: true,
  },
  {
    field: 'coupon',
    sortable: true,
    resizable: true,
    cellDataType: 'number',
  },
  {
    field: 'issuer',
    sortable: true,
    resizable: true,
    cellDataType: 'text',
  },
  {
    field: 'hairCut',
    sortable: true,
    resizable: true,
    cellDataType: 'number',
  },
  {
    field: 'active',
    sortable: true,
    resizable: true,
    cellDataType: 'boolean',
  },
  {
    colId: 'sector',
    field: 'categories.sector',
    sortable: true,
    resizable: true,
    cellDataType: 'text',
  },
];
