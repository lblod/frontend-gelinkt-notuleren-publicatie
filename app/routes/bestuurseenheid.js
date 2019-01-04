import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Route.extend(DataTableRouteMixin, {
  modelName: 'zitting',

  mergeQueryOptions(params) {
    // make param available for setupController hook
    this.set('bestuurseenheidNaam', params.bestuurseenheid_naam);
    this.set('bestuurseenheidClassificatieLabel', params.bestuurseenheid_classificatie_code_label);

    return {
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][naam]': params.bestuurseenheid_naam,
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][classificatie][label]': params.bestuurseenheid_classificatie_code_label,
      sort: '-geplande-start',
      include: 'agenda,agenda.agendapunten.behandeling,notulen,bestuursorgaan'
    };
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.store.query('bestuurseenheid', {
      'filter[naam]': this.bestuurseenheidNaam,
      'filter[classificatie][label]': this.bestuurseenheidClassificatieLabel
    }).then(bestuurseenheden => controller.set('bestuurseenheid', bestuurseenheden.firstObject));
  }
});
