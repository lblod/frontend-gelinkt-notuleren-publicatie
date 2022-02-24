import Model, { attr } from '@ember-data/model';

export default class PublishedResourceModel extends Model {
  @attr('datetime') createdOn;

  rdfaBindings = {
    class: 'sign:PublishedResource',
    createdOn: {
      //In mu-cl-resources:
      //property: 'dct:created',
      //For use in RDFa:
      property: 'eli:date_publication',
      datatype: 'xsd:date',
    },
  };
}
