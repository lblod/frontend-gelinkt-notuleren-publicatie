import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingenZittingBesluitenlijstIndexRoute extends Route {
  @service store;

  async model() {
    let zitting = this.modelFor('bestuurseenheid.zittingen.zitting');
    let besluitenlijst = await zitting.besluitenlijst;
    let besluiten = await this.store.query('besluit', {
      page: {
        number: 0,
        size: 100,
      },
      'filter[besluitenlijst][:id:]': besluitenlijst.id,
      sort: 'volgend-uit-behandeling-van-agendapunt.position',
      include: 'volgend-uit-behandeling-van-agendapunt',
    });

    return {
      zitting,
      besluitenlijst,
      besluiten,
    };
  }
}
