import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BestuurseenheidRoute extends Route {
  @service router;
  breadCrumb = {};

  async model(params, transition) {
    transition.data.bestuurseenheidNaam = params.bestuurseenheid_naam;
    transition.data.bestuurseenheidClassificatieLabel = params.bestuurseenheid_classificatie_code_label;

    const bestuurseenheden = await this.store.query('bestuurseenheid', {
      'include': 'classificatie',
      'filter[:exact:naam]': params.bestuurseenheid_naam,
      'filter[classificatie][:exact:label]': params.bestuurseenheid_classificatie_code_label
    });

    return bestuurseenheden.get('firstObject');
  }

  async afterModel(bestuurseenheid, transition) {
    if (bestuurseenheid) {
      let rootCrumb = {
        title: 'Zoekpagina',
        linkable: true,
        path: 'index',
        isHead: true
      };

      let breadCrumb = {
        title: `${transition.data.bestuurseenheidClassificatieLabel} ${transition.data.bestuurseenheidNaam}`,
        linkable: true,
        path: 'bestuurseenheid'
      };

      this.breadCrumbs = [rootCrumb, breadCrumb];
    } else {
      this.router.transitionTo('route-not-found');
    }
  }
}
