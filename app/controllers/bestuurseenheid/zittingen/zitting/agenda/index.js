import Controller from '@ember/controller';

export default class BestuurseenheidZittingenZittingAgendaIndexController extends Controller {
  get sortedAgendapoints() {
    return this.model.sortedAgendapoints;
  }

  get meeting() {
    return this.model.meeting;
  }

  get publication() {
    return this.model.agenda.publication;
  }
}
