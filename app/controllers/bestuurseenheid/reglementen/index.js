import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

const DEFAULT_PAGE_SIZE = 10;
export default class BestuurseenheidReglementenIndexController extends Controller {
  queryParams = ['page', 'pageSize', 'sort'];
  @tracked page = 0;
  @tracked pageSize = DEFAULT_PAGE_SIZE;
  @tracked sort = '-zitting.geplande-start'
  @tracked isLoadingModel;


  get extracts() {
    return this.model?.uittreksels;
  }

  get count() {
    return this.extracts?.meta.count ?? 0;
  }
}
