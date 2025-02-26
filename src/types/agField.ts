import { Field } from './field';

export type AgField = Omit<Field, 'title'> & {
  exclude?: boolean;
};
