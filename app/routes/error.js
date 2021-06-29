import Route from '@ember/routing/route';

export default class ErrorRoute extends Route {
  // note model hooks are not called on error routes
  setupController(controller, error) {
    const rootCrumb = {
      title: 'Zoekpagina',
      linkable: true,
      path: 'index',
      isHead: true
    };
    const errorCrumb = {
      title: 'Error',
      linkable: false,
      path: 'error'
    };
    this.breadCrumbs = [rootCrumb, errorCrumb];
    if (error) {
      console.error(error);
      controller.errorMessage = error.message;
    }
    super.setupController(...arguments);
  }
}
