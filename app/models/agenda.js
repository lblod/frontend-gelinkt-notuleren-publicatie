import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class AgendaModel extends Model {
  @attr uri;
  @attr inhoud;
  @hasMany('agendapunt') agendapunten;
  @belongsTo('published-resource') publication;

  type = 'http://data.lblod.info/id/document-types/agenda';

  rdfaBindings = Object.freeze({
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publication: 'prov:wasDerivedFrom'
  })
}
