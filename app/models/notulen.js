import Model, { attr, hasMany } from '@ember-data/model';

export default class NotulenModel extends Model {
  @attr uri;
  @attr inhoud;
  @hasMany('published-resource', { inverse: null }) publications;

  type = 'http://data.lblod.info/id/document-types/notulen';

  rdfaBindings = {
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publications: 'prov:wasDerivedFrom'
  }
}
