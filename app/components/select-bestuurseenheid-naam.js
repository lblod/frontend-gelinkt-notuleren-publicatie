import Component from '@glimmer/component';
import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

import { tracked } from '@glimmer/tracking';
import { use, Resource } from 'ember-could-get-used-to-this';

class BestuureenheidsNamen extends Resource {
  @service store;
  @tracked bestuureenheidNamen = [];


  get value() {
    return this.bestuureenheidNamen;
  }

  setup() {
    let [bestuurseenheidClassificatie, searchText] = this.args.positional;
    this.bestuurseenheidClassificatie = bestuurseenheidClassificatie;
    this.findOrganisationNamesTask.perform(searchText);
  }

  // update() {
  //   debugger;
  //   let [bestuurseenheidClassificatie, searchText] = this.args.positional;
  //   this.bestuurseenheidClassificatie = bestuurseenheidClassificatie;
  //   this.findOrganisationNamesTask.perform(searchText);
  // }

  teardown() {
    // this.findOrganisationNamesTask.cancelAll();
  }

  @restartableTask
  *findOrganisationNamesTask(searchText) {
    const queryParams =  {
      sort: 'naam',
      filter: {
        classificatie: {
          id: this.bestuurseenheidClassificatie.value
        }
      }
    };

    if (searchText)
      queryParams['filter[naam]'] = searchText;

    const bestuurseenheden = yield this.store.query('bestuurseenheid', queryParams);
    debugger;

    // this.bestuureenheidNamen = [
    //   ...bestuurseenheden.getEach('naam')
    // ]
  }
}

export default class SelectBestuurseenheidNaamComponent extends Component {
  @use bestuureenheidNamen = new BestuureenheidsNamen(() => {
    return [
      this.args.bestuurseenheidClassificatie,
      this.searchText,
    ];
  });
  @tracked searchText = '';

  @restartableTask
  *search(text) {
    yield timeout(200); // Timeout for debouncing

    console.log('searching')
    this.searchText = text;
  }
}
