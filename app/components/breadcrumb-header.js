import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { eq, gt } from 'ember-awesome-macros';
import { capitalize } from '@ember/string';

export default Component.extend({
  router: service(),
  depthLevel2: eq('routeDepth', 2),
  depthLevel3: eq('routeDepth', 3),
  depthLevel4: eq('routeDepth', 4),
  depthGreaterThan3: gt('routeDepth', 3),

  async init() {
    this._super(...arguments);

    const routeInfo = await this.router.recognizeAndLoad(this.router.currentURL);
    let zitting = null;
    if(await routeInfo.attributes.length) {
      zitting = await routeInfo.attributes.get('firstObject');
    } else {
      zitting = await routeInfo.attributes;
    }
    this.set('zitting', zitting);

    const bestuursorgaan = await this.zitting.bestuursorgaan;
    this.set('bestuursorgaanInTijd', await bestuursorgaan.isTijdsspecialisatieVan);
    this.set('bestuurseenheid', await this.bestuursorgaanInTijd.bestuurseenheid);

    const splitedRouteName = this.router.currentRouteName.split('.');
    this.set('routeDepth', splitedRouteName.length);
    this.set('formattedRouteName', capitalize(splitedRouteName.objectAt(splitedRouteName.length - 2)));
  }
});
