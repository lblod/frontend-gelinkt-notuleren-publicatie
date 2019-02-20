import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('zitting', params.id);
  },

  afterModel(model) {
    this.controllerFor('application').set('selectedZitting', model);
    this.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
});
