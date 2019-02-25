import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { filter, map } from 'ember-awesome-macros/array';
import { notEmpty } from 'ember-awesome-macros';

export default Model.extend({
  geplandeStart: attr('datetime'),
  gestartOpTijdstip: attr('datetime'),
  geeindigdOpTijdstip: attr('datetime'),
  opLocatie: attr(),
  bestuursorgaan: belongsTo('bestuursorgaan'),
  afgeleidUit: attr(), // replace with relation to notulen
  agendapunten: hasMany('agendapunt'),

  isPublished: notEmpty('afgeleidUit'), // TODO replace with validation on notulen
  hasBesluitenlijst: notEmpty(filter(map('agendapunten', a => a.behandeling.get('id')), i => i)),
  hasAgenda: notEmpty('agendapunten')
});
