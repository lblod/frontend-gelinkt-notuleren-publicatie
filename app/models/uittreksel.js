import Model, { attr, belongsTo } from '@ember-data/model';

export default class UittrekselModel extends Model {
  @attr uri;
  @attr inhoud;
  @belongsTo('behandeling-van-agendapunt') behandelingVanAgendapunt;

  type = 'http://data.lblod.info/id/document-types/uittreksel';

  rdfaBindings = {
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publication: 'prov:wasDerivedFrom'
  }
}
