import Model, { attr } from '@ember-data/model';

export default class BestuurseenheidClassificatieCodeModel extends Model {
  @attr label;
  @attr scopeNote;
  @attr uri;

  rdfaBindings = {
    class: 'skos:Concept',
    label: 'skos:prefLabel',
    scopeNote: 'skos:scopeNote',
  };
}
