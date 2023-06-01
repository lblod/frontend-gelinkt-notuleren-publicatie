import Route from '@ember/routing/route';

export default class BestuurseenheidZittingenZittingUittrekselsDetailIndexRoute extends Route {
  async model() {
    const uittreksel = this.modelFor(
      'bestuurseenheid.zittingen.zitting.uittreksels.detail'
    );
    const publication = uittreksel.get('publication');
    const zitting = this.modelFor('bestuurseenheid.zittingen.zitting');
    return {
      uittreksel,
      publication,
      zitting,
    };
  }
}
