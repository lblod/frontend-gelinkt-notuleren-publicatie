import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BestuurseenheidRoute extends Route {
  @service router;
  @service store;

  async model(params, transition) {
    const bestuurseenheden = await this.store.query('bestuurseenheid', {
      include: 'classificatie',
      'filter[:exact:naam]': params.bestuurseenheid_naam,
      'filter[classificatie][:exact:label]':
        params.bestuurseenheid_classificatie_code_label,
    });
    if (bestuurseenheden.length == 0) {
      return null;
    } else {
      transition.data.bestuurseenheidNaam = params.bestuurseenheid_naam;
      transition.data.bestuurseenheidClassificatieLabel =
        params.bestuurseenheid_classificatie_code_label;
      return bestuurseenheden.get('firstObject');
    }
  }
}
