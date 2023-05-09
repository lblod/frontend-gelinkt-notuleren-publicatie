import Route from '@ember/routing/route';
import { service } from '@ember/service';

const PAGE_SIZE = 10;

export default class ReglementenIndexRoute extends Route {
  @service store;
  @service fastboot;

  queryParams = {
    page: {
      refreshModel: true,
    },
    to: {
      refreshModel: false,
    },
    from: {
      refreshModel: false,
    },
  };

  async model(params) {
    const bestuurseenheid = this.modelFor('bestuurseenheid');
    const model = await this.store.query('uittreksel', {
      include: ['zitting', 'behandeling-van-agendapunt.besluiten'].join(),
      'filter[zitting][bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][:id:]':
        bestuurseenheid.id,
      'fields[published-resource]': 'id',
      'fields[zitting]': 'id',
      'fields[besluit]': 'id',
      sort: '-zitting.geplande-start',
      page: {
        number: params.page || 0,
        size: PAGE_SIZE,
      },
    });
    const pageNumber = Number(params.page) || 0;
    model.meta.page = pageNumber;
    model.meta.pageStart = pageNumber * PAGE_SIZE + 1;
    model.meta.pageEnd = (pageNumber + 1) * PAGE_SIZE;
    if (model.meta.pageEnd > model.meta.count) {
      model.meta.pageEnd = model.meta.count;
    }
    if (pageNumber !== 0) {
      model.meta.previousPage = pageNumber - 1;
    }
    if ((pageNumber + 1) * PAGE_SIZE < model.meta.count) {
      model.meta.nextPage = pageNumber + 1;
    }

    return { model };
  }

  setupController(controller, { model }) {
    super.setupController(controller, model);
  }
}
