import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb ||{ title: 'Bekendmakingen en uittreksels' };
  },

  async model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    return (await this.store.query('zitting', {
      // TODO add pagination in template instead of retrieving besluiten through include
      'filter[id]': id,
      include: 'uittreksels.behandeling-van-agendapunt.onderwerp,uittreksels.behandeling-van-agendapunt.besluiten'
    })).get('firstObject');
  }
});
