import Route from '@ember/routing/route';

export default class BestuurseenheidIndexRoute extends Route {
  model() {
    const id = this.modelFor('bestuurseenheid').get('id');
    return this.store.query('zitting', {
      include: [
        'bestuursorgaan.is-tijdsspecialisatie-van',
        'notulen',
        'besluitenlijst',
        'uittreksels',
        'agendas',
      ].join(),
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][:id:]': id,
      sort: '-geplande-start'
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
}
