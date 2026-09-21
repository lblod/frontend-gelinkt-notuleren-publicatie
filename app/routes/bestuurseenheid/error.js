import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidErrorRoute extends Route {
  @service router;

  /**
   * The model hooks (beforeModel, model, and afterModel) of an error substate are not called.
   * Only the setupController method of the error substate is called with the error as the model.**/
  setupController(controller, error) {
    super.setupController(...arguments);
    if (error && error.isAdapterError && error.errors?.[0]?.status === '404') {
      const model = this.modelFor('bestuurseenheid');
      if (model) {
        this.router.replaceWith('bestuurseenheid', model);
      }
    }
  }
}
