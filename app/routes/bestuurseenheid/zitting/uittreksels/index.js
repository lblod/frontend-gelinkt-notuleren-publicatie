import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb ||{ title: 'Bekendmakingen' };
  },

  model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    return this.store.findRecord('zitting', id, {
      // TODO add pagination in template instead of retrieving besluiten through include
      include: 'uittreksels.behandeling-van-agendapunt.onderwerp,uittreksels.behandeling-van-agendapunt.besluiten'
    });
  }
});
