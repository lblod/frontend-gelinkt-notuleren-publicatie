import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb || {};
  },

  model(params) {
    return this.store.findRecord('zitting', params.id);
  },

  async afterModel(model) {
    this.controllerFor('application').set('selectedZitting', model);

    const bestuursorgaan = await model.bestuursorgaan;
    const bestuursorgaanInTijd = await bestuursorgaan.isTijdsspecialisatieVan;
    const date = model.geplandeStart;

    const breadCrumb = {
      title: `Zitting van ${bestuursorgaanInTijd.naam}, op ${moment(date).format('D MMMM YYYY, HH:mm')}`
    };

    this.set('breadCrumb', breadCrumb);
  }
});
