import Controller from '@ember/controller';
import {
  computed
} from '@ember/object';

export default Controller.extend({
  labelIsSelected: false,
  naamIsSelected: false,

  bestuurseenheidClassificatieLabels: computed(function() {
    return this.model.getEach('label').uniq()
  }),

  bestuurseenheidNamen: computed('bestuurseenheidClassificatieLabel', 'bestuurseenheidNaam', function() {
    return this.get('store').query('bestuurseenheid', {
      filter: {
        classificatie: {
          label: this.bestuurseenheidClassificatieLabel
        },
        naam: this.bestuurseenheidNaam,
      },
    }).then(function(bestuurseenheden) {
      return bestuurseenheden.getEach('naam');
    });
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
