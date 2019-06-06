import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    return (await this.store.query('zitting', {
      // TODO add pagination in template instead of retrieving agendapunten through include
      'filter[id]': id,
      include: 'notulen,agendapunten,uittreksels,besluitenlijst'
    })).get('firstObject');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('bestuurseenheid', this.modelFor('bestuurseenheid'));
  }
});
