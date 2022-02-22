import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BestuurseenheidZittingNotulenRoute extends Route {
  @service store;

  breadCrumb = { title: 'Notulen' };

  async model() {
    const meeting = this.modelFor('bestuurseenheid.zitting');
    const meetingNotes = await this.store.query('notulen', {
      "filter[zitting][:id:]": meeting.id,
      sort: "-publication.created-on",
      include: "publication"
    });

    const notulen = meetingNotes.firstObject;
    return { notulen, zitting: meeting };
  }
}

