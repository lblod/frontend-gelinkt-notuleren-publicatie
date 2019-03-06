import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('bestuurseenheid.zitting');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
});
