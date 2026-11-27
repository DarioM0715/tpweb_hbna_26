import type { PaginatedResult } from '../interfaces/paginated.interface.js';

const DEFAULT_LIMIT = 20;
const DEFAULT_PAGE = 1;
const MAX_LIMIT = 100;

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
  take: number;
}

export function buildPagination(
  page?: number,
  limit?: number,
): PaginationParams {
  const safePage = page && page > 0 ? Math.floor(page) : DEFAULT_PAGE;
  const safeLimit =
    limit && limit > 0
      ? Math.min(Math.floor(limit), MAX_LIMIT)
      : DEFAULT_LIMIT;

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
    take: safeLimit,
  };
}

export function toPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / limit);

  return {
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    data,
  };
}

export function buildOrderBy<T extends string>(
  sort: string | undefined,
  order: 'asc' | 'desc' | undefined,
  allowedFields: readonly T[],
  defaultField: T,
): Partial<Record<T, 'asc' | 'desc'>> {
  const field =
    sort && (allowedFields as readonly string[]).includes(sort)
      ? (sort as T)
      : defaultField;

  return { [field]: order === 'desc' ? 'desc' : 'asc' } as Partial<
    Record<T, 'asc' | 'desc'>
  >;
}
