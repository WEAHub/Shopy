export interface Paginated<T> {
  page: number;
  limit: number;
  count: number;
  data: T[];
}
