import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  openbaar: attr(),
  afgeleidUit: attr(),
  gevolg: attr('language-string'),
  vorigeBehandelingVanAgendapunt: belongsTo('behandeling-van-agendapunt'),
  onderwerp: belongsTo('agendapunt', {inverse: 'behandeling' }),
  besluiten: hasMany('besluit', {inverse: 'volgendUitBehandelingVanAgendapunt'}),
  zitting: belongsTo('zitting')
});
