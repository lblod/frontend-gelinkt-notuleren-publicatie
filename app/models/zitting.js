import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { filter, map } from 'ember-awesome-macros/array';
import { notEmpty } from 'ember-awesome-macros';

export default Model.extend({
  geplandeStart: attr('datetime'),
  gestartOpTijdstip: attr('datetime'),
  geeindigdOpTijdstip: attr('datetime'),
  opLocatie: attr(),
  bestuursorgaan: belongsTo('bestuursorgaan'),
  afgeleidUit: attr(),
  agenda: belongsTo('agenda'),

  isPublished: notEmpty('afgeleidUit'),
  hasBesluitenlijst: notEmpty(filter(map('agenda.agendapunten', a => a.behandeling.get('id')), i => i))
});
