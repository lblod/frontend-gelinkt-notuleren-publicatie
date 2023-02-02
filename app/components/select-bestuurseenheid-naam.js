import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class SelectBestuurseenheidNaamComponent extends Component {
  @service store;
  @tracked bestuurseenheidNamen;

  findBestuurseenheidNamen = restartableTask(async (search) => {
    await timeout(200);

    const queryParams = {
      sort: 'naam',
      filter: {
        classificatie: {
          id: this.args.bestuurseenheidClassificatie.value,
        },
      },
    };

    if (search) queryParams['filter[naam]'] = search;
    const bestuurseenheden = await this.store.query(
      'bestuurseenheid',
      queryParams
    );
    this.bestuurseenheidNamen = bestuurseenheden.getEach('naam');
  });
}
