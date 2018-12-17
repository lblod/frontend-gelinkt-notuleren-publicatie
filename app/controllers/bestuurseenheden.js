import Controller from '@ember/controller';
import {
  computed
} from '@ember/object';

export default Controller.extend({
  labelIsSelected: false,
  naamIsSelected: false,

  bestuurseenheidClassificatieLabels: computed(function() {
    return this.model.getEach('classificatie').getEach('label').uniq();
  }),

  bestuurseenheidNamen: computed('bestuurseenheidClassificatieLabel', function() {
    return this.model.filterBy('classificatie.label', this.bestuurseenheidClassificatieLabel).getEach('naam');
  }),

  actions: {
    chooseBestuurseenheidClassificatieLabel(bestuurseenheidClassificatieLabel) {
      this.set('bestuurseenheidClassificatieLabel', bestuurseenheidClassificatieLabel);
      this.set('labelIsSelected', true);
    },
    chooseBestuurseenheidNaam(bestuurseenheidNaam) {
      this.set('bestuurseenheidNaam', bestuurseenheidNaam);
      this.set('naamIsSelected', true);
    }
  }
});
