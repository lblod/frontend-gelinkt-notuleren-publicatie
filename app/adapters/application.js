import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service fastboot;
  constructor() {
    super(...arguments);
    if (this.fastboot.isFastBoot) {
      this.host = window.BACKEND_URL;
    }
  }
}
