import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  uri: attr(),
  inhoud: attr(),
  behandelingVanAgendapunt: belongsTo('behandeling-van-agendapunt'),

  type: 'http://data.lblod.info/id/document-types/uittreksel',

  rdfaBindings: Object.freeze({
    class: 'foaf:Document',
    type: 'dct:type',
    inhoud: 'prov:value',
    publication: 'prov:wasDerivedFrom'
  })
});
