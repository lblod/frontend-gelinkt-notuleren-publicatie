import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { trackedFunction } from 'ember-resources/util/function';
export default class SparqlController extends Controller {
  @service fastboot;

  yasgui = trackedFunction(this, async () => {
    if (!this.fastboot.isFastBoot) {
      return (await import('../modifiers/yasgui')).default;
    }
  });
}
