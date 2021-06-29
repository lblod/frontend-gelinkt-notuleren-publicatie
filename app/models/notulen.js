import Model, { attr, belongsTo } from '@ember-data/model';

export default class NotulenModel extends Model {
  @attr uri;
  @attr inhoud;
  @belongsTo('published-resource', { inverse: null }) publication;

  type = 'http://data.lblod.info/id/document-types/notulen';

  rdfaBindings = {
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publication: 'prov:wasDerivedFrom'
  }
}
