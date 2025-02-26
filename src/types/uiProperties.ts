export type sortBarSize = 'compact' | 'normal' | 'large';

interface SortBar {
  /* size of the filter bar */
  size?: sortBarSize;
  /* maxium width of the sort pill. Defaults to 90px */
  sortPillWidth?: number;
}

interface DropDown {
  /* max height of the dropdown */
  maxDropdownHeight?: number;
  /* max width of the dropdown */
  dropdownWidth?: number;
  /* max width of a sort option */
  sortOptionWidth?: number;
}

export interface UIProperties extends SortBar, DropDown {}
