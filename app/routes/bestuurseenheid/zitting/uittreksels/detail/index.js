import Route from '@ember/routing/route';

export default class BestuurseenheidZittingUittrekselsDetailIndexRoute extends Route {
  async model() {
    const uittreksel = this.modelFor('bestuurseenheid.zitting.uittreksels.detail');
    const publication = uittreksel.get('publication');
    return {
      uittreksel,
      publication,
      zitting: this.modelFor('bestuurseenheid.zitting'),
    };
  }
}
