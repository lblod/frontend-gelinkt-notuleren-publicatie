import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingenZittingBesluitenlijstIndexRoute extends Route {
  @service store;

  async model() {
    let zitting = this.modelFor('bestuurseenheid.zittingen.zitting');
    let besluitenlijst = await zitting.besluitenlijst;

    return {
      zitting,
      besluitenlijst,
    };
  }
}
