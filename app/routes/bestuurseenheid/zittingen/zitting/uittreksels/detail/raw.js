import Route from '@ember/routing/route';

export default class BestuurseenheidZittingenZittingUittrekselDetailRawRoute extends Route {
  model() {
    return this.modelFor(
      'bestuurseenheid.zittingen.zitting.uittreksels.detail'
    );
  }
}
