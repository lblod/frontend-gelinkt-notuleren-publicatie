import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  uri: attr(),
  naam: attr(),
  bindingEinde: attr('date'),
  bindingStart: attr('date'),
  bestuurseenheid: belongsTo('bestuurseenheid', { inverse: null }),
  classificatie: belongsTo('bestuursorgaan-classificatie-code', { inverse: null }),
  isTijdsspecialisatieVan: belongsTo('bestuursorgaan', { inverse: null }),
  heeftTijdsspecialisaties: hasMany('bestuursorgaan', { inverse: null }),

  rdfaBindings: Object.freeze({
    class: "besluit:Bestuursorgaan",
    naam: "skos:prefLabel",
    bindingEinde: "mandaat:bindingEinde",
    bindingStart: "mandaat:bindingStart",
    bestuurseenheid: "besluit:bestuurt",
    classificatie: "besluit:classificatie",
    isTijdsspecialisatieVan: "mandaat:isTijdspecialisatieVan"
  })
});
