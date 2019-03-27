import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  besluitenSort: Object.freeze([
    'position',
    'onderwerp.position'
  ]),

  besluiten: sort('model.behandelingVanAgendapunten', 'besluitenSort'),

  actions: {
    toggleExpand(besluit) {
      besluit.set('isExpanded', !besluit.get('isExpanded'));
    }
  }

});
