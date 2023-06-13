import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class BesluitOverviewItemComponent extends Component {
  @service store;
  @service fastboot;

  @tracked uittreksel = null;
  @tracked stemmingen = [];

  constructor() {
    super(...arguments);
    if (this.fastboot.isFastBoot) {
      this.fastboot.deferRendering(this.findUittreksel.perform());
      this.fastboot.deferRendering(this.findStemmingen.perform());
    } else {
      this.findUittreksel.perform();
      this.findStemmingen.perform();
    }
  }

  findUittreksel = task(async () => {
    let uittreksels = await this.store.query('uittreksel', {
      'filter[behandeling-van-agendapunt][besluiten][id]': this.args.besluit.id,
    });
    this.uittreksel = uittreksels[0];
  });

  findStemmingen = task(async () => {
    const behandeling = await this.args.besluit
      .volgendUitBehandelingVanAgendapunt;
    const stemmingen = await behandeling.stemmingen;

    this.stemmingen = stemmingen;
  });
}
