import Component from '@glimmer/component';
import { restartableTask } from 'ember-concurrency';
export default class SelectBestuurseenheidClassificatieLabelComponent extends Component {
  findbestuurseenheidClassificatie = restartableTask(async () => {
    return (await this.args.model).map((bestuurseenheid) => ({
      value: bestuurseenheid.id,
      label: bestuurseenheid.label,
    }));
  });
}
