import { helper } from '@ember/component/helper';

export default helper(function reglementTitle([title] /*, hash*/) {
  if (!title || title === '') {
    return 'Ontbrekende titel';
  }
  return title;
});
