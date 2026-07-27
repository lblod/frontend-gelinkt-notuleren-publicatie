import Route from '@ember/routing/route';

import { service } from '@ember/service';

// Route created for backwards compatibility, redirects to `bestuurseenheid.zittingen.zitting`
export default class BestuurseenheidZittingRoute extends Route {
  @service store;
  @service router;

  async model(params) {
    const { path } = params;
    const firstPartOfPath = path.split('/')[0];

    // we can optimize for the common case of people visiting non-existing subroutes of `zittingen`, which will also end up here
    // we can know for sure that the string `zittingen` is not a real meeting id
    //
    // any further heuristics are risky, as we commonly use 2 types of UUIDs, some that look like e90b9150-866e-11f1-8222-011c4ae6dd94
    // and others that look like 6A155C562B2D194E1A19BE11
    //
    // We could check for letters that are not ABCDEF, but unsure how solid that would be,
    // and any attacker trying to DDos can easily craft a bogus uuid that matches whatever regex we could come up with
    if (firstPartOfPath === 'zittingen') {
      return false;
    }
    try {
      await this.store.findRecord('zitting', firstPartOfPath);
      return true;
    } catch (e) {
      if (e.isAdapterError) {
        return false;
      } else {
        throw e;
      }
    }
  }
  afterModel(model, transition) {
    if (model) {
      // the client is trying to visit /<municipality>/<admin-unit>/<legitimate-meeting-id>/*any* subroute
      // this is likely because the client is used to the old uri scheme that didn't use the extra "zittingen" path we added later
      // so we want to redirect them to /<municipality>/<admin-unit>/zittingen/<legitimate-meeting-id>/*any*
      //
      // note: we won't trap clients visiting the legitimate /<municipality>/<admin-unit>/zittingen/*any existing subroute* routes, as they are tried first in the router,
      // so wouldn't end up in this place

      const baseUrl = this.router.urlFor(
        'bestuurseenheid',
        this.paramsFor('bestuurseenheid')
      );
      const url = `${baseUrl}/zittingen/${transition.to.params.path}`;

      this.router.replaceWith(url);
    } else {
      // the client is trying to visit /<municipality>/<admin-unit>/*any non-existing subroute*
      // this is just a 404
      //
      // note: this also includes clients visiting /<municipality>/<admin-unit>/zittingen/*any non-existing subroute*, since the router tries everything in sequence
      this.router.transitionTo('bestuurseenheid.error');
    }
  }
}
