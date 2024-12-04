export type ListResult<T> = {
  total: number;
  filtered: number;
  page: number | null;
  size: number | null;
  data: T[];
};