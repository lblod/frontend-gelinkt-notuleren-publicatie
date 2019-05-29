import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ENV from 'frontend-gelinkt-notuleren-publicatie/config/environment';

export default Component.extend({
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),

  init() {
    this._super(...arguments);
    this.set('footer', ENV['vo-webuniversum']['footer']);
  }
});
