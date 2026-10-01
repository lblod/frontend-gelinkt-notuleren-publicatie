import Controller from '@ember/controller';

export default class BestuurseenheidZittingenZittingIndexController extends Controller {
  get zitting() {
    return this.model;
  }
}
