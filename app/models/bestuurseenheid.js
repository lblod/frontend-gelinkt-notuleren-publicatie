import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {
  belongsTo,
  hasMany
} from 'ember-data/relationships';

export default Model.extend({
  naam: attr(),
  classificatie: belongsTo('bestuurseenheid-classificatie-code', {
    inverse: null
  }),
  bestuursorganen: hasMany('bestuursorgaan', {
    inverse: null
  }),
  uri: attr()
});
