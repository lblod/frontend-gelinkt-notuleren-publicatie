import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    setBestuurseenheidClassificatie(bestuurseenheidClassificatie) {
      this.set('bestuurseenheidNaam', null);
      this.set('bestuurseenheidClassificatie', bestuurseenheidClassificatie);
    },

    setBestuurseenheidNaam(bestuurseenheidNaam) {
      this.set('bestuurseenheidNaam', bestuurseenheidNaam);
    }
  }
});
