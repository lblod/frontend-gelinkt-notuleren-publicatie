import Route from '@ember/routing/route';

export default class BestuurseenheidZittingUittrekselsDetailRoute extends Route {
  breadCrumb = { title: 'Detail uittreksel' };

  model(params) {
    return this.store.findRecord('uittreksel', params.uittreksel_id, {
      include: 'publication'
    });
  }
}
