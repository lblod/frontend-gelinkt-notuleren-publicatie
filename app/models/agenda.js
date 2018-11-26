import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  zitting: belongsTo('zitting'),
  agendapunten: hasMany('agendapunt')
});
