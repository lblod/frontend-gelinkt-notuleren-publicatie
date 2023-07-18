import Route from '@ember/routing/route';
import { service } from '@ember/service';

// Route created for backwards compatibility, redirects to `bestuurseenheid.zittingen.zitting`
export default class BestuurseenheidZittingIndexRoute extends Route {
  @service router;

  beforeModel() {
    const params = this.paramsFor('bestuurseenheid.zitting');
    this.router.replaceWith(
      'bestuurseenheid.zittingen.zitting',
      params.zitting_id
    );
  }
}
