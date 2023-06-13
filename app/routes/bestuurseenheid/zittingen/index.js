import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingenIndexRoute extends Route {
  @service store;
  @service fastboot;
  queryParams = {
    page: {
      refreshModel: true,
    },
    to: {
      refreshModel: true,
    },
    from: {
      refreshModel: true,
    },
    administrativeBodyClassURI: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
    sort: {
      refreshModel: true,
    },
  };

  async model(params) {
    const bestuurseenheid = this.modelFor('bestuurseenheid');
    const zittingen = await this.store.query('zitting', {
      include: [
        'bestuursorgaan.is-tijdsspecialisatie-van',
        'notulen',
        'besluitenlijst',
        'uittreksels',
        'agendas',
      ].join(),
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][:id:]':
        bestuurseenheid.id,
      'filter[:gte:gestart-op-tijdstip]': params.from,
      'filter[:lte:gestart-op-tijdstip]': params.to,
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][classificatie][:uri:]':
        params.administrativeBodyClassURI,
      'fields[zittingen]':
        'geplande-start,gestart-op-tijdstip,notulen,bestuursorgaan,besluitenlijst,uittreksels,agendas',
      'fields[notulen]': 'id',
      'fields[besluitenlijsten]': 'id',
      'fields[uittreksels]': 'id',
      'fields[agendas]': 'id',
      sort: params.sort,
      page: {
        number: params.page,
        size: params.pageSize,
      },
    });
    return { zittingen, bestuurseenheid };
  }
}
