import Route from '@ember/routing/route';

export default class BestuurseenheidZittingUittrekselsDetailRoute extends Route {
  model(params) {
    return this.store.findRecord('uittreksel', params.uittreksel_id, {
      include: [
        'behandeling-van-agendapunt.onderwerp',
        'behandeling-van-agendapunt.besluiten'
      ].join()
    });
  }
}
