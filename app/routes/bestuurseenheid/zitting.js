import Route from '@ember/routing/route';

export default class BestuurseenheidZittingRoute extends Route {
  model(params) {
    return this.store.findRecord('zitting', params.id);
  }
}
