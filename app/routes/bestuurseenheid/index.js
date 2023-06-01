import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidIndexRoute extends Route {
  @service router;

  beforeModel() {
    this.router.replaceWith('bestuurseenheid.zittingen');
  }
}
