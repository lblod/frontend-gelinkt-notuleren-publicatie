import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  uri: attr(),
  inhoud: attr(),
  publications: hasMany('published-resource', { inverse: null }),

  type: 'http://data.lblod.info/id/document-types/notulen',

  rdfaBindings: Object.freeze({
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publications: 'prov:wasDerivedFrom'
  })
});
