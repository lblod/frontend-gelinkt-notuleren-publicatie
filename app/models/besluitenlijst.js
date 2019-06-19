import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default Model.extend({
  uri: attr(),
  inhoud: attr(),
  besluiten: hasMany('besluit'),

  type: 'http://data.lblod.info/id/document-types/besluitenlijst',

  rdfaBindings: Object.freeze({
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publication: 'prov:wasDerivedFrom'
  })
});
