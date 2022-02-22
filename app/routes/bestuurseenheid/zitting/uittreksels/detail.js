import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BestuurseenheidZittingUittrekselsDetailRoute extends Route {
  @service store;
  breadCrumb = { title: 'Detail uittreksel' };

  model(params) {
    return this.store.findRecord('uittreksel', params.uittreksel_id, {
      include: 'publication'
    });
  }
}
