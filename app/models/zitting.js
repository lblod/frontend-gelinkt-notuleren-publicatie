import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { alias, sort } from '@ember/object/computed';

export default Model.extend({
  uri: attr(),
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

  agenda: alias('agendas.firstObject'), // TODO doesn's seem to work on the template
  agendapuntenSort: Object.freeze(['position']),
  sortedAgendapunten: sort('agendapunten', 'agendapuntenSort'),

  rdfaBindings: Object.freeze({
    class: "besluit:Zitting",
    geplandeStart: {
      property: "besluit:geplandeStart",
      datatype: "xsd:dateTime"
    },
    gestartOpTijdstip: {
      property: "prov:startedAtTime",
      datatype: "xsd:dateTime"
    },
    geeindigdOpTijdstip: {
      property: "prov:endedAtTime",
      datatype: "xsd:dateTime"
    },
    opLocatie: "prov:atLocation",
    bestuursorgaan: "besluit:isGehoudenDoor",
    agendapunten: "besluit:behandelt",
    sortedAgendapunten: "besluit:behandelt",
    agenda: "besluit:heeftAgenda", // TODO update in backend
    agendas: "besluit:heeftAgenda", // TODO update in backend
    uittreksels: "besluit:heeftUittreksel", // TODO update in backend
    besluitenlijst: "besluit:heeftBesluitenlijst", // TODO update in backend
    notulen: "besluit:heeftNotulen"
  })
});
