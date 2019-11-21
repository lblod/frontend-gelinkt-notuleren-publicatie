import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb || {};
  },

  async model(params){
    this.set('bestuurseenheidNaam', params.bestuurseenheid_naam);
    this.set('bestuurseenheidClassificatieLabel', params.bestuurseenheid_classificatie_code_label);
    const bestuurseenheden = await this.store.query('bestuurseenheid', {
      'include': 'classificatie',
      'filter[:exact:naam]': params.bestuurseenheid_naam,
      'filter[classificatie][:exact:label]': params.bestuurseenheid_classificatie_code_label
    });
    return bestuurseenheden.get('firstObject');
  },

  async afterModel(model) {
    if (model) {
      const rootCrumb = {
        title: 'Zoekpagina',
        linkable: true,
        path: 'index',
        isHead: true
      };
      const breadCrumb = {
        title: `${this.bestuurseenheidClassificatieLabel} ${this.bestuurseenheidNaam}`,
        linkable: true,
        path: 'bestuurseenheid'
      };
      this.set('breadCrumbs', [rootCrumb, breadCrumb]);
    } else {
      this.transitionTo('route-not-found');
    }
  }
});
