import { isSome } from '../utils/option';
import { helper } from '@ember/component/helper';

export function pagination({ count = 0, pageSize = 20, page = 0 }) {
  const totalPages = count / pageSize;
  const pageStart = page * pageSize + 1;
  const pageEnd = Math.min((page + 1) * pageSize, count);
  const nextPage = page < totalPages - 1 ? page + 1 : null;
  const previousPage = page > 0 ? page - 1 : null;
  const hasPreviousPage = isSome(previousPage);
  const hasNextPage = isSome(nextPage);

  return {
    count,
    pageSize,
    page,
    totalPages,
    pageStart,
    pageEnd,
    nextPage,
    previousPage,
    hasPreviousPage,
    hasNextPage,
  };
}

export default helper((_, named) => pagination(named));
