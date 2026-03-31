import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';

const DEFAULT_PAGE_SIZE = 10;
export default class BestuurseenheidReglementenIndexController extends Controller {
  queryParams = ['page', 'pageSize', 'sort', 'searchValue'];
  @tracked page = 0;
  @tracked pageSize = DEFAULT_PAGE_SIZE;
  @tracked sort = 'publicationdate';
  @tracked isLoadingModel;
  @tracked searchValue;

  get extracts() {
    return this.model?.uittreksels;
  }

  get count() {
    return this.extracts?.meta.count ?? 0;
  }

  updateFilter = restartableTask(async (event) => {
    await timeout(300);
    this.searchValue = event.target.value;
  });
}
