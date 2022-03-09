import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BestuurseenheidZittingIndexRoute extends Route {
  @service store;

  async model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    const zittingP = await this.store.query('zitting', {
      // TODO add pagination in template instead of retrieving agendapunten through include
      // notulen, agendas, uittreksels and besluitenlijst are included because of FastBoot
      'filter[:id:]': id,
      include: 'notulen,agendas,uittreksels,besluitenlijst,agendapunten',
    });
    const zitting = zittingP.firstObject;
    const bestuurseenheid = await zitting.get('bestuursorgaan');
    await bestuurseenheid.get('isTijdsspecialisatieVan');
    return zitting;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
}
