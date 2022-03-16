import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BehandelingVanAgendapuntModel extends Model {
  @attr uri;
  @attr openbaar;
  @attr afgeleidUit;
  @attr('language-string') gevolg;
  @attr('number') position;
  @belongsTo('behandeling-van-agendapunt', {
    inverse: 'volgendeBehandelingVanAgendapunt',
  })
  vorigeBehandelingVanAgendapunt;
  @belongsTo('behandeling-van-agendapunt', {
    inverse: 'vorigeBehandelingVanAgendapunt',
  })
  volgendeBehandelingVanAgendapunt;
  @belongsTo('agendapunt', { inverse: 'behandeling' }) onderwerp;
  @hasMany('besluit', { inverse: 'volgendUitBehandelingVanAgendapunt' })
  besluiten;
  @belongsTo('zitting') zitting;
  @belongsTo('published-resource', { inverse: null }) publication;
  @hasMany('stemming', { inverse: null }) stemmingen;

  rdfaBindings = {
    class: 'besluit:BehandelingVanAgendapunt',
    openbaar: {
      property: 'besluit:openbaar',
      datatype: 'xsd:boolean',
    },
    afgeleidUit: 'pav:derivedFrom',
    gevolg: 'besluit:gevolg',
    vorigeBehandelingVanAgendapunt: 'besluit:gebeurtNa',
    onderwerp: 'dct:subject',
    besluiten: 'prov:generated',
    stemmingen: 'besluit:heeftStemming',
  };
}
