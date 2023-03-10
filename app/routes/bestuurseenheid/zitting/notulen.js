import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingNotulenRoute extends Route {
  @service store;

  async model() {
    const parentMeeting = this.modelFor('bestuurseenheid.zitting');
    const meeting = await this.store.findRecord('zitting', parentMeeting.id, {
      reload: true,
      sort: '-notulen.publication.created-on',
      include: 'notulen,notulen.publication',
    });
    return meeting;
  }
}
