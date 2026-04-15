export default function buildSort(sort) {
  if (!sort) return '';
  let sortParameter;
  let sortDirection;
  if (sort.charAt(0) === '-') {
    sortParameter = sort.slice(1);
    sortDirection = 'DESC';
  } else {
    sortParameter = sort;
    sortDirection = 'ASC';
  }
  return `ORDER BY ${sortDirection}(?${sortParameter})`;
}
