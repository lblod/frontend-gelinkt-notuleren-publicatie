import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
    findBestuurseenheidNamen: task(function * () {
      yield timeout(400); // Timeout for debouncing
      let bestuurseenheidNamen = yield this.store.query('bestuurseenheid', {
        filter: {
          classificatie: {
            label: this.bestuurseenheidClassificatieLabel
          },
          naam: this.bestuurseenheidNaam,
        },
      }).then(function(bestuurseenheden) {
        return bestuurseenheden.getEach('naam');
      });
      this.set('bestuurseenheidNamen', bestuurseenheidNamen);
    }).restartable(),

    async didReceiveAttrs() {
      this._super(...arguments);
      await this.findBestuurseenheidNamen.perform();
    },

    actions: {
      chooseBestuurseenheidNaam(bestuurseenheidNaam) {
        this.set('bestuurseenheidNaam', bestuurseenheidNaam);
        this.findBestuurseenheidNamen.perform();
        this.onSelect(true, bestuurseenheidNaam);
      }
    }
});
