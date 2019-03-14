import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb || { title: 'Agenda' };
  },

  model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    return this.store.findRecord('zitting', id, {
      // TODO add pagination in template instead of retrieving agendapunten through include
      include: 'agendapunten'
    });
  }
});
