import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
export default Controller.extend({
  agendaSort:['position'],
  agendapunten:sort('model.agenda.agendapunten', 'agendaSort')
});
