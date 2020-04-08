import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    const zitting = this.modelFor('bestuurseenheid.zitting');
    const uittreksel = this.modelFor('bestuurseenheid.zitting.uittreksels.detail');
    return hash({
      uittreksel: uittreksel,
      zitting: zitting
    });
  }
});
