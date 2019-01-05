import Controller from '@ember/controller';
import ENV from 'frontend-gelinkt-notuleren-publicatie/config/environment';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('footer', ENV['vo-webuniversum']['footer']);
  },

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
