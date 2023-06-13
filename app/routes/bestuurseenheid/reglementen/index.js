import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class BestuurseenheidReglementenIndexRoute extends Route {
  @service store;
  @service fastboot;

  queryParams = {
    page: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
    sort: {
      refreshModel: true
    }
  };

  @action
  loading(transition) {
    // eslint-disable-next-line ember/no-controller-access-in-routes
    let controller = this.controllerFor('bestuurseenheid.reglementen.index');
    controller.set('isLoadingModel', true);

    transition.finally(function () {
      controller.set('isLoadingModel', false);
    });
  }

  async model(params) {
    const bestuurseenheid = this.modelFor('bestuurseenheid');
    const uittreksels = await this.store.query('uittreksel', {
      include: ['zitting', 'behandeling-van-agendapunt.besluiten'].join(),
      'filter[zitting][bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][:id:]':
        bestuurseenheid.id,
      'filter[behandeling-van-agendapunt][besluiten][:has:parts]': 'yes',
      'fields[published-resource]': 'id',
      'fields[zitting]': 'id',
      'fields[besluit]': 'id',
      sort: params.sort,
      page: {
        number: params.page,
        size: params.pageSize,
      },
    });
    return { bestuurseenheid, uittreksels };
  }
}
