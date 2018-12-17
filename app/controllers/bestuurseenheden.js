import Controller from '@ember/controller';
import {
  computed
} from '@ember/object';
import {
  debounce
} from '@ember/runloop';
import ENV from 'frontend-gelinkt-notuleren-publicatie/config/environment';

export default Controller.extend({
  labelIsSelected: false,
  naamIsSelected: false,

  init() {
    this._super(...arguments);
    this.set('footer', ENV['vo-webuniversum']['footer']);
  },

  bestuurseenheidClassificatieLabels: computed(function() {
    return this.model.getEach('label').uniq();
  }),

  bestuurseenheidNamen: computed('bestuurseenheidClassificatieLabel', 'bestuurseenheidNaam', function() {
    return this.get('store').query('bestuurseenheid', {
      sort: 'naam',
      filter: {
        classificatie: {
          label: this.bestuurseenheidClassificatieLabel
        },
        naam: this.bestuurseenheidNaam
      }
    }).then(function(bestuurseenheden) {
      return bestuurseenheden.getEach('naam');
    });
  }),


  doChooseBestuurseenheidNaam: function(bestuurseenheidNaam) {
    this.set('bestuurseenheidNaam', bestuurseenheidNaam);
    this.set('naamIsSelected', true);
  },

  actions: {
    chooseBestuurseenheidClassificatieLabel(bestuurseenheidClassificatieLabel) {
      this.set('bestuurseenheidClassificatieLabel', bestuurseenheidClassificatieLabel);
      this.set('labelIsSelected', true);
    },

    chooseBestuurseenheidNaam(bestuurseenheidNaam) {
      debounce(this, this.doChooseBestuurseenheidNaam, bestuurseenheidNaam, 150);
    }
  }
});
