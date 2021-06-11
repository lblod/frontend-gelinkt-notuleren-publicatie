import Route from '@ember/routing/route';

export default class BestuurseenheidZittingAgendaIndexRoute extends Route {
  breadCrumb = { title: 'Agenda' };

  async model() {
    const zitting = this.modelFor('bestuurseenheid.zitting');
    const agendas = await this.store.query('agenda', {
      "filter[zitting][:id:]": zitting.id,
      sort: "-publication.created-on",
      include: "publication"
    });
    const agenda = agendas.firstObject;
    const meeting = await this.store.findRecord(
      'zitting',
      zitting.id,
      { include: "agendapunten,bestuursorgaan" }
    );
    const agendapunten = await meeting.get('agendapunten');
    const sortedAgendapoints = agendapunten.sortBy('position');
    return {meeting, agenda, sortedAgendapoints};
  }
}
