import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BestuurseenheidRoute extends Route {
  @service router;
  @service store;

  async model(params) {
    const bestuurseenheden = await this.store.query('bestuurseenheid', {
      include: 'classificatie',
      'filter[:exact:naam]': params.bestuurseenheid_naam,
      'filter[classificatie][:exact:label]':
        params.bestuurseenheid_classificatie_code_label,
    });
    if (bestuurseenheden.length == 0) {
      return this.router.redirectTo('route-not-found');
    } else {
      return bestuurseenheden.get('firstObject');
    }
  }
}
