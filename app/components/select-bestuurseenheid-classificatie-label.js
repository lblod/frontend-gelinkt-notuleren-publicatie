import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class SelectBestuurseenheidClassificatieLabelComponent extends Component {
  @tracked bestuurseenheidClassificatie;

  findbestuurseenheidClassificatie = task(async () => {
    this.bestuurseenheidClassificatie = (await this.args.model).map(
      (bestuurseenheid) => ({
        value: bestuurseenheid.id,
        label: bestuurseenheid.label,
      })
    );
  });
}
