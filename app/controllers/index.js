import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked bestuurseenheidNaam;
  @tracked bestuurseenheidClassificatie;

  @action
  setBestuurseenheidClassificatie(bestuurseenheidClassificatie) {
    this.bestuurseenheidNaam = null;
    this.bestuurseenheidClassificatie = bestuurseenheidClassificatie;
  }

  @action
  setBestuurseenheidNaam(bestuurseenheidNaam) {
    this.bestuurseenheidNaam = bestuurseenheidNaam;
  }
}
