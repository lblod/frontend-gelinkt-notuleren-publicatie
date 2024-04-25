import Route from '@ember/routing/route';

export default class ErrorRoute extends Route {
  // note model hooks are not called on error routes
  setupController(controller, error) {
    if (error) {
      console.error(JSON.stringify(error));
      controller.errorMessage = error.message;
    }
    super.setupController(...arguments);
  }
}
