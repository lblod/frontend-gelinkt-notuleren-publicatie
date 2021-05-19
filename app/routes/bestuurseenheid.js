import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BestuurseenheidRoute extends Route {
  @service router;

  async model(params) {
    const bestuurseenheden = await this.store.query('bestuurseenheid', {
      'include': 'classificatie',
      'filter[:exact:naam]': params.bestuurseenheid_naam,
      'filter[classificatie][:exact:label]': params.bestuurseenheid_classificatie_code_label
    });

    return bestuurseenheden.get('firstObject');
  }

  async afterModel(bestuurseenheid) {
    if (!bestuurseenheid) {
      this.router.transitionTo('route-not-found');
    }
  }
}
