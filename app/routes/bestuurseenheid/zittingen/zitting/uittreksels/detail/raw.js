import Route from '@ember/routing/route';

export default class BestuurseenheidZittingUittrekselDetailRawRoute extends Route {
  model() {
    return this.modelFor('bestuurseenheid.zittingen.zitting.uittreksels.detail');
  }
}
