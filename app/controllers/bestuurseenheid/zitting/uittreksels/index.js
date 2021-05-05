import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default class BestuurseenheidZittingUittrekselsIndexController extends Controller {
  bvapSort = [
    'behandelingVanAgendapunt.position',
    'behandelingVanAgendapunt.onderwerp.position'
  ];

  @sort('model.uittreksels', 'bvapSort') uittreksels;
}
