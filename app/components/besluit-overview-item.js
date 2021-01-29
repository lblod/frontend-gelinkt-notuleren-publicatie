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
  findStemmingen: task(function *(){
    const behandeling=yield this.besluit.volgendUitBehandelingVanAgendapunt;
    const stemmingen=yield behandeling.stemmingen;

    this.set('stemmingen', stemmingen);
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.fastboot.isFastBoot) {
      this.fastboot.deferRendering(this.findUittreksel.perform());
      this.fastboot.deferRendering(this.findStemmingen.perform());
    } else {
      this.findUittreksel.perform();
      this.findStemmingen.perform();
    }
  }
});
