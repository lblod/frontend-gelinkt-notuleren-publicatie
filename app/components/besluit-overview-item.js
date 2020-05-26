import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: 'div',
  store: service(),
  fastboot: service(),

  findUittreksel: task(function *(){
    let uittreksels = yield this.store.query('uittreksel', {
      'filter[behandeling-van-agendapunt][besluiten][id]': this.besluit.id
    });
    this.set('uittreksel', uittreksels.firstObject);
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.fastboot.isFastBoot) {
      this.fastboot.deferRendering(this.findUittreksel.perform());
    } else {
      this.findUittreksel.perform()
    }
  }
});
