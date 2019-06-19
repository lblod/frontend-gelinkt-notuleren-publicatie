import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  uri: attr(),
  beschrijving: attr(),
  citeeropschrift: attr(),
  motivering: attr('language-string'),
  publicatiedatum: attr('date'),
  inhoud: attr(),
  taal: attr(),
  titel: attr(),
  score: attr(),
  volgendUitBehandelingVanAgendapunt: belongsTo('behandeling-van-agendapunt', { inverse: 'besluiten' }),
  publications: hasMany('published-resource', { inverse: null }),

  rdfaBindings: Object.freeze({
    class: 'besluit:Besluit',
    titel: 'eli:title',
    beschrijving: 'eli:description',
    citeeropschrift: 'eli:title_short',
    motivering: 'besluit:motivering',
    publicatiedatum: {
      property: 'eli:date_publication',
      datatype: 'xsd:date'
    },
    inhoud: 'prov:value',
    taal: 'eli:language'
    // volgendUitBehandelingVanAgendapunt: '^prov:generated'  // TODO add support for inverse relations in ember-rdfa-helpers
  })
});
