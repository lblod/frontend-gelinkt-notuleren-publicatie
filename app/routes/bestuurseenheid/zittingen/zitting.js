import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('zitting', params.zitting_id, {
      include: 'bestuursorgaan,bestuursorgaan.is-tijdsspecialisatie-van',
    });
  }
}
