import Route from '@ember/routing/route';

export default class BestuurseenheidZittingUittrekselsDetailIndexRoute extends Route {
  model() {
    return {
      uittreksel: this.modelFor('bestuurseenheid.zitting.uittreksels.detail'),
      zitting: this.modelFor('bestuurseenheid.zitting'),
    }
  }
}
