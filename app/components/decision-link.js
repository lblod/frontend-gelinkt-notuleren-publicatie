import Component from '@glimmer/component';
import { trackedTask } from 'ember-resources/util/ember-concurrency';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class DecisionLinkComponent extends Component {
  @service store;

  fetchPublishedExtractTask = task(async () => {
    const uittreksels = await this.store.query('uittreksel', {
      'filter[behandeling-van-agendapunt][besluiten][:uri:]': this.decisionURI,
      'fields[uittreksels]': 'uri',
    });
    if (uittreksels.length) {
      return uittreksels[0];
    } else {
      return null;
    }
  });

  publishedExtractData = trackedTask(this, this.fetchPublishedExtractTask);

  get uittrekselId() {
    return this.publishedExtractData.value?.id;
  }
  get decisionURI() {
    return this.args.decisionElement.getAttribute('resource');
  }
  get isLoading() {
    return this.publishedExtractData.isRunning;
  }
}
