import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BesluitModel extends Model {
  @attr uri;
  @attr beschrijving;
  @attr citeeropschrift;
  @attr('language-string') motivering;
  @attr('date') publicatiedatum;
  @attr inhoud;
  @attr taal;
  @attr titel;
  @attr score;
  @belongsTo('behandeling-van-agendapunt', {
    async: true,
    inverse: 'besluiten',
  })
  volgendUitBehandelingVanAgendapunt;
  @hasMany('published-resource', { async: true, inverse: null }) publications;

  rdfaBindings = {
    class: 'besluit:Besluit',
    titel: 'eli:title',
    beschrijving: 'eli:description',
    citeeropschrift: 'eli:title_short',
    motivering: 'besluit:motivering',
    publicatiedatum: {
      property: 'eli:date_publication',
      datatype: 'xsd:date',
    },
    inhoud: 'prov:value',
    taal: 'eli:language',
    volgendUitBehandelingVanAgendapunt: 'prov:wasGeneratedBy',
    // volgendUitBehandelingVanAgendapunt: '^prov:generated'  // TODO add support for inverse relations in ember-rdfa-helpers
  };
}
