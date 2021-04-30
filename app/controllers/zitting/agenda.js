import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default class ZittingAgendaController extends Controller {
  agendaSort = ['position'];
  @sort('model.agenda.agendapunten', 'agendaSort') agendapunten;
}
