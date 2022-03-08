import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BestuurseenheidZittingNotulenRoute extends Route {
  @service store;

  async model() {
    //Why was it done this way:
    //const meeting = await this.modelFor('bestuurseenheid.zitting');
    //const meetingNotes = await this.store.query('notulen', {
    //  'filter[zitting][:id:]': meeting.id,
    //  sort: '-publication.created-on',
    //  include: 'publication',
    //});
    //const notulen = meetingNotes.firstObject;
    //return { notulen, zitting: meeting };
    //When this looks easier and works the same:  ?
    const zitting = await this.modelFor('bestuurseenheid.zitting');
    const notulen = await zitting.notulen;
    const publicatie = await notulen.publication;
    const bestuursorgaan = await zitting.bestuursorgaan;
    const isTijdsspecialisatieVan = await bestuursorgaan.isTijdsspecialisatieVan;
    return zitting;
    //Could have used fastboot.deferRendering, but even in normal mode, we want to wait untill all this data is loaded before rendering the page, so that nothing jumps on screen.
  }
}
