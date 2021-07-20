import { helper } from '@ember/component/helper';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export default helper(function formatDate([date, dateFormat]/*, hash*/) {
  try {
    return format(date, dateFormat , {locale: nl});
  }
  catch(e) {
    console.warn(`could not format date ${date} to format ${dateFormat}`,e);
    return "";
  }
});
