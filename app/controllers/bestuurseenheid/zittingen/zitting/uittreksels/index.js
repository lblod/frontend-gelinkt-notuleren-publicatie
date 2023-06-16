/* eslint-disable ember/no-computed-properties-in-native-classes */
import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default class BestuurseenheidZittingenZittingUittrekselsIndexController extends Controller {
  get zitting() {
    return this.model;
  }

  bvapSort = [
    'behandelingVanAgendapunt.position',
    'behandelingVanAgendapunt.onderwerp.position',
  ];

  @sort('model.uittreksels', 'bvapSort') uittreksels;
}
