import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Route.extend(DataTableRouteMixin, {
  modelName: 'zitting',
  mergeQueryOptions(params) {
    return {
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][id]': params.bestuurseenheid_id,
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][classificatie][id]': params.bestuurseenheid_classificatie_code_id,
      sort: '-geplande-start',
      include: 'agenda,behandelde-agendapunten,notulen,bestuursorgaan'
    };
  },
  afterModel(zittingen/*, transition*/) {
    if (zittingen.get('length') > 0) {
      this.transitionTo('bestuurseenheid.zitting.agenda', zittingen.get('firstObject.id'));
    }
  }
});
