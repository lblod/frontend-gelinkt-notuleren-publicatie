import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { restartableTask } from 'ember-concurrency';

const PAGE_SIZE = 10;

export default class ReglementenIndexController extends Controller {
  @service store;
  @tracked from;
  @tracked to;
  @tracked page = 0;
  @tracked bestuurseenheid;
  @tracked model;
  today = new Date().toISOString().substring(0, 10);
  queryParams = ['page'];

  fetchMeetings = restartableTask(async () => {
    this.model = null;
    const model = await this.store.query('uittreksel', {
      include: ['zitting', 'behandeling-van-agendapunt.besluiten'].join(),
      'filter[zitting][bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][:id:]':
        this.bestuurseenheid.id,
      'fields[published-resource]': 'id',
      'fields[zitting]': 'id',
      'fields[besluit]': 'id',
      sort: '-zitting.geplande-start',
      page: {
        number: this.page || 0,
        size: PAGE_SIZE,
      },
    });
    const pageNumber = Number(this.page) || 0;
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
    this.model = model;
  });
}
