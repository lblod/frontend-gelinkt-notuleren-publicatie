import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
    findBestuurseenheidClassificatieLabels: task(function * () {
      const bestuurseenheidClassificatieLabels = yield this.model.getEach('label').uniq();
      this.set('bestuurseenheidClassificatieLabels', bestuurseenheidClassificatieLabels);
    }),

    async didReceiveAttrs() {
      this._super(...arguments);
      await this.findBestuurseenheidClassificatieLabels.perform();
    },

    actions: {
      chooseBestuurseenheidClassificatieLabel(bestuurseenheidClassificatieLabel) {
        this.set('bestuurseenheidClassificatieLabel', bestuurseenheidClassificatieLabel);
        this.onSelect(bestuurseenheidClassificatieLabel);
      }
    },
});
