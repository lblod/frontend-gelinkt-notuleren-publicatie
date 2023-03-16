import Model, { attr, hasMany } from '@ember-data/model';

export default class BesluitenlijstModel extends Model {
  @attr uri;
  @attr inhoud;
  @attr('date') publicatiedatum;
  @hasMany('besluit', { async: true, inverse: null }) besluiten;

  type = 'http://data.lblod.info/id/document-types/besluitenlijst';

  rdfaBindings = {
    class:
      'foaf:Document https://data.vlaanderen.be/id/concept/BesluitDocumentType/3fa67785-ffdc-4b30-8880-2b99d97b4dee',
    type: 'dct:type',
    inhoud: 'prov:value',
    publication: 'prov:wasDerivedFrom',
    publicatiedatum: {
      property: 'eli:date_publication',
      datatype: 'xsd:date',
    },
  };
}
