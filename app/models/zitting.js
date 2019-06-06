import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  geplandeStart: attr('datetime'),
  gestartOpTijdstip: attr('datetime'),
  geeindigdOpTijdstip: attr('datetime'),
  opLocatie: attr(),
  bestuursorgaan: belongsTo('bestuursorgaan', { inverse: null }),
  agendapunten: hasMany('agendapunt'),
  agendas: hasMany('agenda'),
  uittreksels: hasMany('uittreksel'),
  besluitenlijst: belongsTo('besluitenlijst'),
  notulen: belongsTo('notulen'),

  rdfaBindings: {
    geplandeStart: "besluit:geplandeStart",
    gestartOpTijdstip: "prov:startedAtTime",
    geeindigdOpTijdstip: "prov:endedAtTime",
    opLocatie: "prov:atLocation",
    bestuursorgaan: "besluit:isGehoudenDoor",
    agendapunten: "besluit:behandelt",
    agendas: "ext:agenda",
    uittreksels: "ext:uittreksel",
    besluitenlijst: "ext:besluitenlijst",
    notulen: "besluit:heeftNotulen",
  }
});
