import Route from '@ember/routing/route';

const PAGE_SIZE = 2;

export default class BestuurseenheidIndexRoute extends Route {
  queryParams = {
    page: {
      refreshModel: true
    }
  }

  async model(params) {
    const id = this.modelFor('bestuurseenheid').get('id');
    const model = await this.store.query('zitting', {
      include: [
        'bestuursorgaan.is-tijdsspecialisatie-van',
        'notulen',
        'besluitenlijst',
        'uittreksels',
        'agendas',
      ].join(),
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][:id:]': id,
      sort: '-geplande-start',
      page: {
        number: params.page || 0,
        size: PAGE_SIZE
      }
    });
    const pageNumber = Number(params.page) || 0;
    model.meta.page = pageNumber;
    model.meta.pageStart = pageNumber * PAGE_SIZE + 1;
    model.meta.pageEnd = (pageNumber + 1) * PAGE_SIZE;
    if(pageNumber !== 0) {
      model.meta.previousPage = pageNumber - 1;
    }
    if((pageNumber + 1) * PAGE_SIZE < model.meta.count ) {
      model.meta.nextPage = pageNumber + 1;
    }
    console.log(model.meta)
    return model;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
}
