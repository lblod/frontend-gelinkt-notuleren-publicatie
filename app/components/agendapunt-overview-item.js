import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class AgendapuntOverviewItemComponent extends Component {
  @service store;
  @service fastboot;
  @tracked uittreksel = null;

  constructor() {
    super(...arguments);

    if (this.fastboot.isFastBoot) {
      this.fastboot.deferRendering(this.findUittreksel.perform());
    } else {
      this.findUittreksel.perform();
    }
  }

  @task
  *findUittreksel() {
    let uittreksels = yield this.store.query('uittreksel', {
      'filter[behandeling-van-agendapunt][onderwerp][id]': this.args.agendapunt.id
    });
    this.uittreksel = uittreksels.firstObject;
  }
}
