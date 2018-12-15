import Controller from '@ember/controller';
import {
  computed
} from '@ember/object';
import {
  filter
} from '@ember/object/computed';

export default Controller.extend({
  bestuurseenheidClassificatieLabels: computed(function() {
    return this.model.getEach('classificatie').getEach('label').uniq();
  }),

  // The filter in not working at all.
  //
  // What is left to do : add a filter so that when the user selects a
  // bestuurseenheidClassificatieLabel, the naamen are updated to fit with the
  // selected label.

  filteredBestuurseenheidNaamen: function() {
    var selectedBestuurseenheidClassificatieLabel = this.get('selectedBestuurseenheidClassificatieLabel');
    var bestuurseenheden = this.model;
    if (selectedBestuurseenheidClassificatieLabel) {
      return bestuurseenheden.filter(function(bestuurseenheid) {
        return bestuurseenheid.get('classificatie.label') === selectedBestuurseenheidClassificatieLabel;
      });
    }
    return bestuurseenheden.getEach('naam');
  }.property('selectedBestuurseenheidClassificatieLabel'),

  bestuurseenheidNaamen: computed(function() {
    // return this.model.getEach('naam');
    return this.get('filteredBestuurseenheidNaamen');
  }),

  actions: {
    chooseBestuurseenheidClassificatieLabel(bestuurseenheidClassificatieLabel) {
      this.set('bestuurseenheidClassificatieLabel', bestuurseenheidClassificatieLabel);
    },
    chooseBestuurseenheidNaam(bestuurseenheidNaam) {
      this.set('bestuurseenheidNaam', bestuurseenheidNaam);
    }
  }
});
