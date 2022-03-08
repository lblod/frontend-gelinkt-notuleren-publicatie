/* eslint-disable ember/no-computed-properties-in-native-classes */
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class ZittingModel extends Model {
  @attr uri;
  @attr('datetime') geplandeStart;
  @attr('datetime') gestartOpTijdstip;
  @attr('datetime') geeindigdOpTijdstip;
  @attr opLocatie;
  @belongsTo('bestuursorgaan', { inverse: null }) bestuursorgaan;
  @hasMany('agendapunt') agendapunten;
  @hasMany('agenda') agendas;
  @hasMany('uittreksel') uittreksels;
  @belongsTo('besluitenlijst') besluitenlijst;
  @belongsTo('notulen') notulen;
  @alias('agendas.firstObject') agenda; // TODO doesn's seem to work on the template

  //Alias does not work in templates, and also not with RDFa helpers. This getters solves some problems for now
  get agendaRDFaClean() {
    return this.agendas.firstObject;
  }

  rdfaBindings = {
    class: 'besluit:Zitting',
    geplandeStart: {
      property: 'besluit:geplandeStart',
      datatype: 'xsd:dateTime',
    },
    gestartOpTijdstip: {
      property: 'prov:startedAtTime',
      datatype: 'xsd:dateTime',
    },
    geeindigdOpTijdstip: {
      property: 'prov:endedAtTime',
      datatype: 'xsd:dateTime',
    },
    opLocatie: 'prov:atLocation',
    bestuursorgaan: 'besluit:isGehoudenDoor',
    agendapunten: 'besluit:behandelt',
    sortedAgendapunten: 'besluit:behandelt',
    agenda: 'besluit:heeftAgenda', // TODO update in backend
    agendaRDFaClean: 'besluit:heeftAgenda',
    agendas: 'besluit:heeftAgenda', // TODO update in backend
    uittreksels: 'besluit:heeftUittreksel', // TODO update in backend
    besluitenlijst: 'besluit:heeftBesluitenlijst', // TODO update in backend
    notulen: 'besluit:heeftNotulen',
  };
}
