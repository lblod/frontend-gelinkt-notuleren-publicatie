import Route from '@ember/routing/route';
import { service } from '@ember/service';

// Route created for backwards compatibility, redirects to `bestuurseenheid.zittingen.zitting`
export default class BestuurseenheidZittingRoute extends Route {
  @service router;

  beforeModel(transition) {
    this.router.replaceWith(
      'bestuurseenheid.zittingen.zitting',
      transition.to.params.zitting_id
    );
  }
}
