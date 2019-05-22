import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  beschrijving: attr(),
  citeeropschrift: attr(),
  motivering: attr('language-string'),
  publicatiedatum: attr('date'),
  inhoud: attr(),
  taal: attr(),
  titel: attr(),
  score: attr(),
  volgendUitBehandelingVanAgendapunt: belongsTo('behandeling-van-agendapunt', { inverse: null }),
  publications: hasMany('published-resource', { inverse: null })
});
