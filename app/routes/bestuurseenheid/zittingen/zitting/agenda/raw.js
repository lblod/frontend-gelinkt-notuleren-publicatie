import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingenZittingAgendaRawRoute extends Route {
  @service store;
  async model() {
    const id = this.modelFor('bestuurseenheid.zittingen.zitting').get('id');
    const agendas = await this.store.query('agenda', {
      'filter[zitting][id]': id,
      page: {
        size: 1,
      },
    });
    return agendas.firstObject;
  }
}
