import Route from '@ember/routing/route';

export default class BestuurseenheidZittingenZittingUittrekselsDetailIndexRoute extends Route {
  async model() {
    const uittreksel = this.modelFor(
      'bestuurseenheid.zittingen.zitting.uittreksels.detail'
    );
    console.info(
      'DEBUGPRINT[18]: index.js:8 (before const publication = await uittreksel.pub…)'
    );
    const publication = await uittreksel.publication;
    const zitting = this.modelFor('bestuurseenheid.zittingen.zitting');
    return {
      uittreksel,
      publication,
      zitting,
    };
  }
}
