import Model, { attr, hasMany } from '@ember-data/model';

export default class BesluitenlijstModel extends Model {
  @attr uri;
  @attr inhoud;
  @attr('date') publicatiedatum;
  @hasMany('besluit') besluiten;

  type = 'http://data.lblod.info/id/document-types/besluitenlijst';

  rdfaBindings = {
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publication: 'prov:wasDerivedFrom',
    publicatieDatum: 'eli:date_publication'
  }
}
