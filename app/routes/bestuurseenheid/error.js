import Route from '@ember/routing/route';

export default Route.extend({

  /**
   * The model hooks (beforeModel, model, and afterModel) of an error substate are not called.
   * Only the setupController method of the error substate is called with the error as the model.**/
  async setupController(controller, error) {
    if (error) {
      if (error.isAdapterError && error.errors[0].status === "404") {
        const model = await this.modelFor('bestuurseenheid');
        this.transitionTo('bestuurseenheid', model);
      }
      else {
        this.transitionTo('error');
      }
    }
    this._super(...arguments);
  }
});
