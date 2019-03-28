import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb || { title: 'Detail uittreksel' };
  },

  model(params) {
    const zittingId = this.modelFor('bestuurseenheid.zitting').get('id');

    return Ember.RSVP.hash({
      uittreksel: this.store.findRecord('uittreksel', params.id,
                                        {include: 'behandeling-van-agendapunt.onderwerp,behandeling-van-agendapunt.besluiten'}),
      zitting: this.store.findRecord('zitting', zittingId)
    });
  }
});