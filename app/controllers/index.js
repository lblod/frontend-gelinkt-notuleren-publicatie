import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    setBestuurseenheidClassificatieLabel(bestuurseenheidClassificatieLabel) {
      this.set('bestuurseenheidNaam', null);
      this.set('bestuurseenheidClassificatieLabel', bestuurseenheidClassificatieLabel);
    },

    setBestuurseenheidNaam(bestuurseenheidNaam) {
      this.set('bestuurseenheidNaam', bestuurseenheidNaam);
    }
  }
});
