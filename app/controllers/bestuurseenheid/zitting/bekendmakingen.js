import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  besluitenSort: Object.freeze([
    'volgendUitBehandelingVanAgendapunt.position',
    'volgendUitBehandelingVanAgendapunt.onderwerp.position'
  ]),
  besluiten: sort('model.besluiten', 'besluitenSort')
});
