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

  // In FastBoot a background reload is a request nobody awaits: the visit
  // renders and the app instance is destroyed while it is still in flight.
  // When the response lands it is pushed into the destroyed store, which
  // re-registers that store in EmberData's module level graph cache and leaks
  // the whole application instance.
  shouldBackgroundReloadRecord() {
    return !this.fastboot.isFastBoot;
  }

  shouldBackgroundReloadAll() {
    return !this.fastboot.isFastBoot;
  }
}
