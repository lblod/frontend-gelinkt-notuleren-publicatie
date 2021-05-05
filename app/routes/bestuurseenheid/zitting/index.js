import Route from '@ember/routing/route';

export default class BestuurseenheidZittingIndexRoute extends Route {
  async model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    return (await this.store.query('zitting', {
      // TODO add pagination in template instead of retrieving agendapunten through include
      // notulen, agendas, uittreksels and besluitenlijst are included because of FastBoot
      'filter[id]': id,
      include: 'notulen,agendas,uittreksels,besluitenlijst,agendapunten'
    })).firstObject;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
}
