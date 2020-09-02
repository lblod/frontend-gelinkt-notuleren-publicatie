import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
export default Controller.extend({
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),

  init() {
    this._super(...arguments);
  }
});
