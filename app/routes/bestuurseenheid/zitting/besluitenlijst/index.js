import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  fastboot: service(),

  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb || { title: 'Besluitenlijst' };
  },

  async model() {
    const zitting = await this.modelFor('bestuurseenheid.zitting');
    const besluitenlijst = await zitting.besluitenlijst;
    return RSVP.hash({
      zitting: zitting,
      besluitenlijst: zitting.besluitenlijst,
      besluiten: await this.store.query('besluit', {  page: {number: 0, size: 100}, "filter[besluitenlijst][:id:]": besluitenlijst.id, sort: "volgend-uit-behandeling-van-agendapunt.onderwerp.position" })
    });
  }
});
