export default function generateMeta(params, count) {
  const lastPage = Math.floor(count / params.size);
  const meta = {
    count: count,
    pagination: {
      first: {
        number: 0,
      },
      last: {
        number: lastPage,
      },
    },
  };
  if (params.page > 0) {
    meta.pagination.prev = {
      number: params.page - 1,
    };
  }
  if (params.page < lastPage) {
    meta.pagination.next = {
      number: params.page + 1,
    };
  }
  return meta;
}
