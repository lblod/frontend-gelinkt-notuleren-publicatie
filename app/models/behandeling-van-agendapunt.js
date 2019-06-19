import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  uri: attr(),
  openbaar: attr(),
  afgeleidUit: attr(),
  gevolg: attr('language-string'),
  position: attr('number'),
  vorigeBehandelingVanAgendapunt: belongsTo('behandeling-van-agendapunt', { inverse: 'volgendeBehandelingVanAgendapunt' }),
  volgendeBehandelingVanAgendapunt: belongsTo('behandeling-van-agendapunt', { inverse: 'vorigeBehandelingVanAgendapunt' }),
  onderwerp: belongsTo('agendapunt', { inverse: 'behandeling' }),
  besluiten: hasMany('besluit', { inverse: 'volgendUitBehandelingVanAgendapunt' }),
  zitting: belongsTo('zitting'),
  publication: belongsTo('published-resource', { inverse: null }),

  rdfaBindings: Object.freeze({
    class: 'besluit:BehandelingVanAgendapunt',
    openbaar: {
      property: 'besluit:openbaar',
      datatype: 'xsd:boolean'
    },
    afgeleidUit: 'pav:derivedFrom',
    gevolg: 'besluit:gevolg',
    vorigeBehandelingVanAgendapunt: 'besluit:gebeurtNa',
    onderwerp: 'dct:subject',
    besluiten: 'prov:generated'
  })
});
