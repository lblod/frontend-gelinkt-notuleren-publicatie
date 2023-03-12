import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BestuursorgaanModel extends Model {
  @attr uri;
  @attr naam;
  @attr('date') bindingEinde;
  @attr('date') bindingStart;
  @belongsTo('bestuurseenheid', { async: true, inverse: null }) bestuurseenheid;
  @belongsTo('bestuursorgaan-classificatie-code', {
    async: true,
    inverse: null,
  })
  classificatie;
  @belongsTo('bestuursorgaan', { async: true, inverse: null })
  isTijdsspecialisatieVan;
  @hasMany('bestuursorgaan', { async: true, inverse: null })
  heeftTijdsspecialisaties;

  rdfaBindings = {
    class: 'besluit:Bestuursorgaan',
    naam: 'skos:prefLabel',
    bindingEinde: 'mandaat:bindingEinde',
    bindingStart: 'mandaat:bindingStart',
    bestuurseenheid: 'besluit:bestuurt',
    classificatie: 'besluit:classificatie',
    isTijdsspecialisatieVan: 'mandaat:isTijdspecialisatieVan',
  };
}
