import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    return this.store.findRecord('zitting', id, {
      include: 'bestuursorgaan,agendapunten'
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
});
