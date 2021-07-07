import Route from '@ember/routing/route';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export default class BestuurseenheidZittingRoute extends Route {
  breadCrumb = {};

  model(params) {
    return this.store.findRecord('zitting', params.id);
  }

  async afterModel(zitting) {
    const bestuursorgaan = await zitting.bestuursorgaan;
    const bestuursorgaanInTijd = await bestuursorgaan.isTijdsspecialisatieVan;
    const date = zitting.geplandeStart;

    this.breadCrumb = {
      title: `Zitting van ${bestuursorgaanInTijd.naam}, op ${format(date,'d MMMM yyyy, HH:mm', { locale: nl})}`
    };
  }
}
