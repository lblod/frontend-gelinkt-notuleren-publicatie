import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingenZittingNotulenRoute extends Route {
  @service store;

  async model() {
    const parentMeeting = this.modelFor('bestuurseenheid.zittingen.zitting');
    // TODO seems like the extra load is maybe not needed as it should be loaded through the
    // parent route
    const meeting = await this.store.findRecord('zitting', parentMeeting.id, {
      reload: true,
      sort: '-notulen.publication.created-on',
      include: 'notulen,notulen.publication,notulen.file',
    });
    const notulen = await meeting.notulen;

    const fileMeta = await notulen.file;
    console.log('fileMeta', fileMeta);
    let notulenContent;
    if (fileMeta) {
      notulenContent = await (await fetch(fileMeta.downloadLink)).text();
    } else {
      notulenContent = notulen.inhoud;
    }
    return { meeting, notulen, notulenContent };
  }
}
