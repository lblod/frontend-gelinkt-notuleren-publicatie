import Route from '@ember/routing/route';
import { service } from '@ember/service';

// Route created for backwards compatibility, redirects to `bestuurseenheid.zittingen.zitting`
export default class BestuurseenheidZittingIndexRoute extends Route {
  @service router;

  beforeModel(transition) {
    const baseUrl = this.router.urlFor(
      'bestuurseenheid',
      this.paramsFor('bestuurseenheid')
    );
    const { zitting_id } = this.paramsFor('bestuurseenheid.zitting');
    const url = `${baseUrl}/zittingen/${zitting_id}/${transition.to.params.path}`;
    this.router.replaceWith(url);
  }

  model() {
    return;
  }
}
