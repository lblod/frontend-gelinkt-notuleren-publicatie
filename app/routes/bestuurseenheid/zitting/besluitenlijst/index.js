import Route from '@ember/routing/route';

export default class BestuurseenheidZittingBesluitenlijstIndexRoute extends Route {
  async model() {
    let zitting = this.modelFor('bestuurseenheid.zitting');
    let besluitenlijst = await zitting.besluitenlijst;
    let besluiten = await this.store.query('besluit', {
      page: {
        number: 0,
        size: 100
      },
      "filter[besluitenlijst][:id:]": besluitenlijst.id,
      sort: "volgend-uit-behandeling-van-agendapunt.onderwerp.position"
    });

    return {
      zitting,
      besluitenlijst,
      besluiten
    };
  }
}
