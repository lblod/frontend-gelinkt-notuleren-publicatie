import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingenZittingUittrekselsIndexRoute extends Route {
  @service store;

  async model() {
    const id = this.modelFor('bestuurseenheid.zittingen.zitting').get('id');
    const zittingen = await this.store.query('zitting', {
      // TODO add pagination in template instead of retrieving besluiten through include
      'filter[id]': id,
      include: [
        'uittreksels.behandeling-van-agendapunt.onderwerp',
        'uittreksels.behandeling-van-agendapunt.besluiten',
      ].join(),
    });
    const zitting = zittingen[0];
    return zitting;
  }
}
