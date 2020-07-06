import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  findBestuurseenheidNamen: task(function*(search) {
    yield timeout(200); // Timeout for debouncing

    const queryParams =  {
      sort: 'naam',
      filter: {
        classificatie: {
          id: this.bestuurseenheidClassificatie.value
        }
      }
    };

    if (search)
      queryParams['filter[naam]'] = search;

    const bestuurseenheden = yield this.store.query('bestuurseenheid', queryParams);
    this.set('bestuurseenheidNamen', bestuurseenheden.getEach('naam'));
  }).restartable(),

  async didReceiveAttrs() {
    this._super(...arguments);
    await this.findBestuurseenheidNamen.perform();
  }
});
