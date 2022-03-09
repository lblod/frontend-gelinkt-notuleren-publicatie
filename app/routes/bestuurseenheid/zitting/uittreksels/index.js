import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BestuurseenheidZittingUittrekselsIndexRoute extends Route {
  @service store;

  async model() {
    const id = await this.modelFor('bestuurseenheid.zitting').get('id');
    const zittingen = await this.store.query('zitting', {
      // TODO add pagination in template instead of retrieving besluiten through include
      'filter[id]': id,
      include: [
        'uittreksels.behandeling-van-agendapunt.onderwerp',
        'uittreksels.behandeling-van-agendapunt.besluiten',
      ].join(),
    });
    const zitting = zittingen.firstObject;
    const bestuursorgaan = await zitting.bestuursorgaan;
    await bestuursorgaan.isTijdsspecialisatieVan;
    return zitting;
  }
}
