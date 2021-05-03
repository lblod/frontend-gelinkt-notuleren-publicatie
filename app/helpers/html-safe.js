import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default helper(function htmlSafeHelper([unsafeString]/*, hash*/) {
  return htmlSafe(unsafeString);
});
