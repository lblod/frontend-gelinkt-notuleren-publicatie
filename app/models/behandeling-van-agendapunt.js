import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BehandelingVanAgendapuntModel extends Model {
  @attr uri;
  @attr openbaar;
  @attr afgeleidUit;
  @attr('language-string') gevolg;
  @attr('number') position;

  @belongsTo('behandeling-van-agendapunt', {
    async: true,
    inverse: 'volgendeBehandelingVanAgendapunt',
  })
  vorigeBehandelingVanAgendapunt;
  @belongsTo('behandeling-van-agendapunt', {
    async: true,
    inverse: 'vorigeBehandelingVanAgendapunt',
  })
  volgendeBehandelingVanAgendapunt;
  @belongsTo('agendapunt', { inverse: 'behandeling', async: true }) onderwerp;
  @belongsTo('zitting', { async: true, inverse: null }) zitting;
  @belongsTo('published-resource', { async: true, inverse: null }) publication;

  @hasMany('besluit', {
    async: true,
    inverse: 'volgendUitBehandelingVanAgendapunt',
  })
  besluiten;
  @hasMany('stemming', { async: true, inverse: null }) stemmingen;

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
