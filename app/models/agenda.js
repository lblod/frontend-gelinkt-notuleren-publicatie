import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  uri: attr(),
  agendapunten: hasMany('agendapunt'),

  type: 'http://data.lblod.info/id/document-types/agenda',

  rdfaBindings: Object.freeze({
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publication: 'prov:wasDerivedFrom'
  })
});
