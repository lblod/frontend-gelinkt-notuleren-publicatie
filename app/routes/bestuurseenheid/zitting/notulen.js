import Route from '@ember/routing/route';

export default class BestuurseenheidZittingNotulenRoute extends Route {
  async model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    const notulen = (await this.store.query('notulen', {
      'filter[zitting][id]': id,
      page: {
        size: 1
      }
    })).firstObject;

    return { notulen, zitting: this.modelFor('bestuurseenheid.zitting') };
  }
}
