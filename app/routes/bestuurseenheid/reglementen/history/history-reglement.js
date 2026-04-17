import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BestuurseenheidReglementenHistoryReglementRoute extends Route {
  @service store;

  async model(params) {
    const historyModel = this.modelFor('bestuurseenheid.reglementen.history');
    const latestVersion = historyModel.history.find(
      (version) => version.latest
    );

    const uittreksel = await this.store.findRecord(
      'uittreksel',
      params.uittreksel_id,
      {
        include:
          'publication,behandeling-van-agendapunt,behandeling-van-agendapunt.besluiten',
      }
    );
    const publication = await uittreksel.publication;
    const bvap = await uittreksel.behandelingVanAgendapunt;
    const besluit = (await bvap.besluiten)[0];
    const isLinkedDecisionOf = await besluit.isLinkedDecisionOf;
    return {
      uittreksel,
      publication,
      isLatest: !isLinkedDecisionOf,
      latestVersionId: latestVersion.uittreksel.id,
    };
  }
}
