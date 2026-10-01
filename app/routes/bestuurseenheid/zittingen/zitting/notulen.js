import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidZittingenZittingNotulenRoute extends Route {
  @service store;
  @service fastboot;

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
    const ftch =
      typeof FastBoot !== 'undefined' ? FastBoot.require('node-fetch') : fetch;
    let notulenContent;
    if (fileMeta) {
      const link = this.fastboot.isFastBoot
        ? `${this.fastboot.request.protocol}//${this.fastboot.request._host()}${fileMeta.downloadLink}`
        : fileMeta.downloadLink;
      notulenContent = await (await ftch(link)).text();
    } else {
      notulenContent = notulen.inhoud ?? 'test';
    }
    return { meeting, notulen, notulenContent };
  }
}
