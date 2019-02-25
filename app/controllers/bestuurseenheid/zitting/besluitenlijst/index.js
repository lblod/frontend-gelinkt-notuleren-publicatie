import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  agendaSort: Object.freeze(['position']),
  agendapunten: sort('model.agendapunten', 'agendaSort'),

  actions: {
    toggleExpand(besluit) {
      besluit.set('isExpanded', !besluit.get('isExpanded'));
    }
  }
});
