import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    setSelectLabelProperties(labelIsSelected, bestuurseenheidClassificatieLabel) {
      this.set('labelIsSelected', labelIsSelected);
      this.set('bestuurseenheidClassificatieLabel', bestuurseenheidClassificatieLabel);
    },

    setSelectNaamProperties(naamIsSelected, bestuurseenheidNaam) {
      this.set('naamIsSelected', naamIsSelected);
      this.set('bestuurseenheidNaam', bestuurseenheidNaam);
    }
  }
});
