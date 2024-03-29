import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  model() {
    return this.store.query('bestuurseenheid-classificatie-code', {
      sort: 'label',
    });
  }
}
