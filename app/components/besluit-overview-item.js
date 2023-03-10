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

  @task
  *findUittreksel() {
    let uittreksels = yield this.store.query('uittreksel', {
      'filter[behandeling-van-agendapunt][besluiten][id]': this.args.besluit.id,
    });
    this.uittreksel = uittreksels.firstObject;
  }

  @task
  *findStemmingen() {
    const behandeling = yield this.args.besluit
      .volgendUitBehandelingVanAgendapunt;
    const stemmingen = yield behandeling.stemmingen;

    this.stemmingen = stemmingen;
  }
}
