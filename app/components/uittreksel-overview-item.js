import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UittrekselOverviewItemComponent extends Component {
  @tracked besluit;
  @tracked isLoadingFinished;
  @action
  async fetchBesluit(uittreksel) {
    const behandelingVanAgendapunt = await uittreksel.behandelingVanAgendapunt;
    const besluit = await behandelingVanAgendapunt.besluiten;
    this.isLoadingFinished = true;
    this.besluit = besluit[0];
  }
}
