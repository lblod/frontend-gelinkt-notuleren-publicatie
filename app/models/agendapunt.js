import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AgendapuntModel extends Model {
  @attr uri;
  @attr beschrijving;
  @attr geplandOpenbaar;
  @attr heeftOntwerpbesluit;
  @attr titel;
  @attr('number') position;
  @belongsTo('agendapunt', { async: true, inverse: null }) vorigeAgendapunt;
  @hasMany('agendapunt', { async: true, inverse: null }) referenties;
  @belongsTo('zitting', { async: true, inverse: 'agendapunten' }) zitting;
  @belongsTo('behandeling-van-agendapunt', {
    async: true,
    inverse: 'onderwerp',
  })
  behandeling;
  @hasMany('published-resource', { async: true, inverse: null }) publications;
  @belongsTo('concept', { async: true, inverse: null }) type;

  rdfaBindings = {
    class: 'besluit:Agendapunt',
    beschrijving: 'dct:description',
    geplandOpenbaar: {
      property: 'besluit:geplandOpenbaar',
      datatype: 'xsd:boolean',
    },
    titel: 'dct:title',
    type: 'besluit:Agendapunt.type',
    vorigeAgendapunt: 'besluit:aangebrachtNa',
    behandeling: 'dct:subject',
    publications: 'prov:wasDerivedFrom',
  };
}
