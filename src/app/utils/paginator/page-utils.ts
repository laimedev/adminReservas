import { Observable } from 'rxjs';
import { isArray } from 'util';

// export class PageUtils {
// }

export interface Sorter<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}

export interface PageRequest<T> {
  page?: number;
  size?: number;
  sort?: Sorter<T>;
  filter?: filterDescriptor[]
}

export interface Page<T> {
  data: T[];
  total: number;
  pageSize: number;
  pageNumber: number;
}

export type PaginatedEndpoint<T> = (req: PageRequest<T>) => Observable<Page<T>>

export interface filterDescriptor {
  field: string;
  value: any;
  operator: string;
}

export type opp = { operator: string, field?: string }


export const operatorType = {
  EQ: 'eq',
  NEQ: 'neq',
  STARTSWITH: 'startswith',
  CONTAINS: 'contains',
  DOESNOTCONTAIN: 'doesnotcontain',
  ENDSWITH: 'endswith',
  GTE: 'gte',
  GT: 'gt',
  LTE: 'lte',
  LT: 'lt'
}


export function toFilterDescriptor(obj: any, map: any): filterDescriptor[] {

  let operator = 'contains'
  let out: filterDescriptor[] = []
  Object.keys(obj).forEach((key) => {

    let itemMap: opp = map[key]
    let itemVal = obj[key]
    let field: any = key;

    if (!itemMap || !itemVal)
      return;

    if (!itemMap.hasOwnProperty('operator'))
      return
    if (itemMap.hasOwnProperty('field'))
      field = itemMap.field;
    operator = itemMap.operator;

    out.push({ field, value: itemVal, operator })

  })

  return out
}
