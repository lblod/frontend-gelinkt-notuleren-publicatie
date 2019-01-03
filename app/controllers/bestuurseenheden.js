import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Controller.extend({
  labelIsSelected: false,
  naamIsSelected: false,

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

  doChooseBestuurseenheidNaam: function(bestuurseenheidNaam) {
    this.set('bestuurseenheidNaam', bestuurseenheidNaam);
    this.set('naamIsSelected', true);
  },

  actions: {
    setSelectLabelsProperties(labelIsSelected, bestuurseenheidClassificatieLabel) {
      this.set('labelIsSelected', labelIsSelected);
      this.set('bestuurseenheidClassificatieLabel', bestuurseenheidClassificatieLabel);
    },

    chooseBestuurseenheidNaam(bestuurseenheidNaam) {
      debounce(this, this.doChooseBestuurseenheidNaam, bestuurseenheidNaam, 150);
    }
  }
});
