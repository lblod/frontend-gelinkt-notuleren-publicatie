import Route from '@ember/routing/route';

export default class BestuurseenheidZittingUittrekselDetailRawRoute extends Route {
  model() {
    return this.modelFor('bestuurseenheid.zitting.uittreksels.detail');
  }
}
