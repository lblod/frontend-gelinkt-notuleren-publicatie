import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
    findbestuurseenheidClassificatie: task(function * () {
      const bestuurseenheidClassificatie = yield this.model.map((bestuurseenheid) => ({value: bestuurseenheid.id, label: bestuurseenheid.label}));
      this.set('bestuurseenheidClassificatie', bestuurseenheidClassificatie);
    }),

    didReceiveAttrs() {
      this._super(...arguments);
      this.findbestuurseenheidClassificatie.perform();
    }
});
