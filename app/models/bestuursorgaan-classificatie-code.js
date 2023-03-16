import Model, { attr } from '@ember-data/model';

export default class BestuursorgaanClassificatieCodeModel extends Model {
  @attr label;
  @attr scopeNote;

  rdfaBindings = {
    class: 'skos:Concept',
    label: 'skos:prefLabel',
    scopeNote: 'skos:scopeNote',
  };
}
