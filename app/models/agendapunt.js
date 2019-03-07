import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  beschrijving: attr(),
  geplandOpenbaar: attr(),
  heeftOntwerpbesluit: attr(),
  titel: attr(),
  type: attr('string-set'),
  position: attr('number'),
  vorigeAgendapunt: belongsTo('agendapunt', { inverse: null }),
  referenties: hasMany('agendapunt', { inverse: null }),
  zitting: belongsTo('zitting'),
  behandeling: belongsTo('behandeling-van-agendapunt'),
  publications: hasMany('published-resource', { inverse: null })
});
