import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class BestuurseenheidReglementenIndexController extends Controller {
  queryParams = ['page'];
  @tracked page = 0;
  @tracked isLoadingModel;

  get extracts() {
    return this.model?.uittreksels;
  }

  get count() {
    return this.extracts?.meta.count ?? 0;
  }

  get pageSize() {
    return this.model?.pageSize ?? 20;
  }
}
