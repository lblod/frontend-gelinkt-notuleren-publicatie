import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  label: attr(),
  scopeNote: attr(),
  uri: attr(),

  rdfaBindings: Object.freeze({
    class: 'skos:Concept',
    label: 'skos:prefLabel',
    scopeNote: 'skos:scopeNote'
  })

});
