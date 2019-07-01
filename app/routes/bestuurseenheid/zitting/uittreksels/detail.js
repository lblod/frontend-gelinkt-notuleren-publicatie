import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb || { title: 'Detail uittreksel' };
  },

  model(params) {
    return this.store.findRecord('uittreksel', params.uittreksel_id, {
      include: 'behandeling-van-agendapunt.onderwerp,behandeling-van-agendapunt.besluiten'
    });
  }
});
