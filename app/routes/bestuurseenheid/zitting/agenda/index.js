import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb || { title: 'Agenda' };
  },

  async model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    return (await this.store.query('zitting', {
      // TODO add pagination in template instead of retrieving agendapunten through include
      'filter[id]': id,
      include: 'agendapunten'
    })).get('firstObject');
  }
});
