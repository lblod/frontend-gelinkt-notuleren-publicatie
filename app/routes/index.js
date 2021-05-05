import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    return this.store.query('bestuurseenheid-classificatie-code', {
      sort: 'label'
    });
  }
}
