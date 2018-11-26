import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { notEmpty } from '@ember/object/computed';

export default Model.extend({
  geplandeStart: attr('datetime'),
  gestartOpTijdstip: attr('datetime'),
  geeindigdOpTijdstip: attr('datetime'),
  opLocatie: attr(),
  bestuursorgaan: belongsTo('bestuursorgaan'),
  afgeleidUit: attr(),
  behandeldeAgendapunten: hasMany('behandeling-van-agendapunt'),
  agenda: belongsTo('agenda'),

  isPublished: notEmpty('afgeleidUit')
});
