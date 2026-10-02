import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidErrorRoute extends Route {
  @service router;
  /**
   * The model hooks (beforeModel, model, and afterModel) of an error substate are not called.
   * Only the setupController method of the error substate is called with the error as the model.**/
  setupController(controller, error, transition) {
    if (error) {
      if (error.isAdapterError && error.errors[0].status === '404') {
        const model = this.modelFor('bestuurseenheid');
        this.router.transitionTo('bestuurseenheid', model);
      } else {
        this.router.transitionTo('error');
      }
    }
    super.setupController(controller, error, transition);
  }
}
