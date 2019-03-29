import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb || { title: 'Detail uittreksel' };
  },

  model(params) {
    const zittingId = this.modelFor('bestuurseenheid.zitting').get('id');
    return hash({
      uittreksel: this.store.findRecord('uittreksel', params.uittreksel_id, {
        include: 'behandeling-van-agendapunt.onderwerp,behandeling-van-agendapunt.besluiten'
      }),
      zitting: this.store.findRecord('zitting', zittingId)
    });
  }
});
