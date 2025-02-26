import { UIProperties } from './State';
import { Field } from './field';
import { Sort } from './sort';

export interface SmartSortProps extends UIProperties {
  /* manage sort */
  sort?: Sort[];
  /* sort change notifier */
  onSortChange?: (sort: Sort[]) => void;
  /* sort clear notifier */
  onClear?: () => void;
  /* fields on which to filter and sort */
  fields: Field[];
}
