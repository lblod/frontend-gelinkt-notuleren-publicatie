import { helper } from '@ember/component/helper';

export default helper(function isoDate([date]/*, hash*/) {
  return date.toISOString();
});
