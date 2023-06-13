import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class SelectBestuurseenheidNaamComponent extends Component {
  @service store;

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
    return (await this.store.query('bestuurseenheid', queryParams)).map(
      (bestuurseenheid) => bestuurseenheid.naam
    );
  });
}
