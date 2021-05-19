import Route from '@ember/routing/route';

export default class BestuurseenheidZittingAgendaIndexRoute extends Route {
  breadCrumb = { title: 'Agenda' };

  async model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    return (await this.store.query('zitting', {
      // TODO add pagination in template instead of retrieving agendapunten through include
      'filter[id]': id,
      include: 'agendapunten'
    })).firstObject;
  }
}
