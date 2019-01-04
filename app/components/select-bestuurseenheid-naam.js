import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  findBestuurseenheidNamen: task(function*() {
    yield timeout(200); // Timeout for debouncing

    const bestuurseenheden = yield this.store.query('bestuurseenheid', {
      filter: {
        classificatie: {
          label: this.bestuurseenheidClassificatieLabel
        },
        naam: this.bestuurseenheidNaam
      }
    });
    this.set('bestuurseenheidNamen', bestuurseenheden.getEach('naam'));
  }).restartable(),

  async didReceiveAttrs() {
    this._super(...arguments);
    await this.findBestuurseenheidNamen.perform();
  },

  actions: {
    chooseBestuurseenheidNaam(bestuurseenheidNaam) {
      this.set('bestuurseenheidNaam', bestuurseenheidNaam);
      this.findBestuurseenheidNamen.perform();
      this.onSelect(bestuurseenheidNaam);
    }
  }
});
