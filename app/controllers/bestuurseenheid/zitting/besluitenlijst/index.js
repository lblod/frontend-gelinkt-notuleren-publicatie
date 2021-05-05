import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default class BestuurseenheidZittingBesluitenLijstIndexController extends Controller {
  besluitenSort = [
    'volgendUitBehandelingVanAgendapunt.position',
    'volgendUitBehandelingVanAgendapunt.onderwerp.position'
  ];

  @sort('model.besluitenlijst.besluiten', 'besluitenSort') besluiten;
}
