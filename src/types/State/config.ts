import { Field } from '../field';
import { Sort } from '../sort';
import { UIProperties } from '../uiProperties';

export interface ConfigState extends UIProperties {
  onSortChange?: (sort: Sort[]) => void;
  onClear?: () => void;
  fields: Field[];
  fieldMap: Map<string, Field>;
}
