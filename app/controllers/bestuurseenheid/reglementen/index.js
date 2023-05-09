import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ReglementenIndexController extends Controller {
  @tracked page = 0;

  getBesluit(uittreksel) {
    return uittreksel.behandelingVanAgendapunt.get('besluiten').firstObject;
  }

  get meetings() {
    return this.model;
  }
}
