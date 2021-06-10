import Model, { attr, belongsTo } from '@ember-data/model';

export default class UittrekselModel extends Model {
  @attr uri;
  @attr inhoud;
  @belongsTo('behandeling-van-agendapunt') behandelingVanAgendapunt;
  @belongsTo('published-resource') publication;
  type = 'http://data.lblod.info/id/document-types/uittreksel';

  rdfaBindings = {
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publication: 'prov:wasDerivedFrom'
  }
}
