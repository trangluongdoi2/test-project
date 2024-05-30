export type ListFieldSort = {
  field: string,
  direction: 'asc' | 'desc';
}

export type QueryConfigs = {
  pageNumber: number | undefined,
  pageSize: number | undefined,
  // itemsPerPage: number | undefined,
  queryFilters: string,
  querySort: string,
}