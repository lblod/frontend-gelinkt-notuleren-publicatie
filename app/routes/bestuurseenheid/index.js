import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const id = this.modelFor('bestuurseenheid').get('id');
    return this.store.query('zitting', {
			'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][:id:]': id,
			sort: '-geplande-start',
			include: 'agenda,agenda.agendapunten.behandeling,notulen,bestuursorgaan'
    });
  }
});
