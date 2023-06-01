import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingIndexRoute extends Route {
  @service store;

  async model() {
    const id = this.modelFor('bestuurseenheid.zittingen.zitting').get('id');
    return this.store.findRecord('zitting', id, {
      // TODO add pagination in template instead of retrieving agendapunten through include
      // notulen, agendas, uittreksels and besluitenlijst are included because of FastBoot
      reload: true,
      include:
        'notulen,agendas,uittreksels,besluitenlijst,agendapunten,bestuursorgaan,bestuursorgaan.is-tijdsspecialisatie-van',
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
}
