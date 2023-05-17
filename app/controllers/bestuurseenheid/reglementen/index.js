import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ReglementenIndexController extends Controller {
  @tracked page = 0;
  @tracked bestuurseenheid;
  @tracked isLoadingModel;

  get extracts() {
    return this.model;
  }
}
