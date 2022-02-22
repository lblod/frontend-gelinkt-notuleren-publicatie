import Route from '@ember/routing/route';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { inject as service } from '@ember/service';

export default class BestuurseenheidZittingRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('zitting', params.id);
  }
}
