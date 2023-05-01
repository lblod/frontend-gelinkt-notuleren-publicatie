import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ReglementenDetailRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('uittreksel', params.uittreksel_id, {
      include: 'publication',
    });
  }
}
