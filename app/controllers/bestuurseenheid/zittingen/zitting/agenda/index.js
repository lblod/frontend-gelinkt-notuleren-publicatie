import Controller from '@ember/controller';

export default class BestuurseenheidZittingAgendaIndexController extends Controller {
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
