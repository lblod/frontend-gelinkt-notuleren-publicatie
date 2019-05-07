import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  naam: attr(),
  bindingEinde: attr('date'),
  bindingStart: attr('date'),
  bestuurseenheid: belongsTo('bestuurseenheid', { inverse: 'bestuursorganen' }),
  classificatie: belongsTo('bestuursorgaan-classificatie-code', { inverse: null }),
  isTijdsspecialisatieVan: belongsTo('bestuursorgaan', { inverse: null }),
  heeftTijdsspecialisaties: hasMany('bestuursorgaan', { inverse: null })
});
