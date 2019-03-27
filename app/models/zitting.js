import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  geplandeStart: attr('datetime'),
  gestartOpTijdstip: attr('datetime'),
  geeindigdOpTijdstip: attr('datetime'),
  opLocatie: attr(),
  bestuursorgaan: belongsTo('bestuursorgaan'),
  agendapunten: hasMany('agendapunt'),
  agendas: hasMany('agenda'),
  uittreksels: hasMany('uittreksel'),
  besluitenlijst: belongsTo('besluitenlijst'),
  notulen: belongsTo('notulen')
});
