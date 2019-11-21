import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const id = this.modelFor('bestuurseenheid').get('id');
    return this.store.query('zitting', {
      'include': 'bestuursorgaan,bestuursorgaan.is-tijdsspecialisatie-van,notulen,besluitenlijst,uittreksels,agendas',
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][:id:]': id,
      sort: '-geplande-start'
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
});
