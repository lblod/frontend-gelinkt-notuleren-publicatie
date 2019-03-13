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
  behandelingVanAgendapunten: hasMany('behandeling-van-agendapunt'), // bvap are directly linked to zitting because they might be published without an agenda
  besluiten: hasMany('besluit'), // besluiten are directly linked to zitting because they might be published without an agenda
  notulen: belongsTo('notulen')
});
