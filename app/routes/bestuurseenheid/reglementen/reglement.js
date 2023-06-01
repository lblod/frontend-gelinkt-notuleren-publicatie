import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidReglementenReglementRoute extends Route {
  @service store
  async model(params) {
    const uittreksel = await this.store.findRecord(
      'uittreksel',
      params.uittreksel_id,
      {
        include: 'publication',
      }
    );
    const publication = await uittreksel.publication;

    return {
      uittreksel,
      publication,
    };
  }
}
