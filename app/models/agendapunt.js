import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AgendapuntModel extends Model {
  @attr uri;
  @attr beschrijving;
  @attr geplandOpenbaar;
  @attr heeftOntwerpbesluit;
  @attr titel;
  @attr('string-set') type;
  @attr('number') position;
  @belongsTo('agendapunt', { inverse: null }) vorigeAgendapunt;
  @hasMany('agendapunt', { inverse: null }) referenties;
  @belongsTo('zitting') zitting;
  @belongsTo('behandeling-van-agendapunt') behandeling;
  @hasMany('published-resource', { inverse: null }) publications;

  rdfaBindings = {
    class: 'besluit:Agendapunt',
    beschrijving: 'dct:description',
    geplandOpenbaar: {
      property: 'besluit:geplandOpenbaar',
      datatype: 'xsd:boolean'
    },
    titel: 'dct:title',
    type: 'besluit:Agendapunt.type',
    vorigeAgendapunt: 'besluit:aangebrachtNa',
    behandeling: 'dct:subject',
    publications: 'prov:wasDerivedFrom'
  }
}
