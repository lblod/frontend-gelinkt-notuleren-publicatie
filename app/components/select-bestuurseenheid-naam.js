import Component from '@glimmer/component';
import { restartableTask, task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

import { tracked } from '@glimmer/tracking';
import { use, Resource } from 'ember-could-get-used-to-this';

class LoadDataResource extends Resource {
  @service store;
  @tracked data = [];

  get value() {
    return this.data;
  }

  setup() {
    this.loadData(this.args.positional[0], this.args.positional[1]);
  }

  async loadData(classificatie, searchText) {
    const queryParams =  {
      // sort: 'naam',
      // filter: {
      //   classificatie: {
      //     id: classificatie.value
      //   }
      // }
    };

    // if (searchText)
    //   queryParams['filter[naam]'] = searchText;
    // const response = await fetch('/bestuurseenheden?filter[classificatie][id]=5ab0e9b8a3b2ca7c5e000001&sort=naam');
    // const json = await response.json();

    const bestuurseenheden = await this.store.findAll('bestuurseenheid');
    this.data = bestuurseenheden.getEach('naam');
    // this.data = [
    //   // ...bestuurseenheden.getEach('naam')
    //   // 'hello'
    // ];
    console.log('load data completed', this.data);
  }
}
class BestuureenheidsNamen extends Resource {
  @service store;
  bestuureenheidNamen = [];


  get value() {
    return this.bestuureenheidNamen;
  }

  setup() {
    let [bestuurseenheidClassificatie, searchText] = this.args.positional;
    this.bestuurseenheidClassificatie = bestuurseenheidClassificatie;
    this.findOrganisationNamesTask(searchText);
  }

  // update() {
  //   let [bestuurseenheidClassificatie, searchText] = this.args.positional;
  //   this.bestuurseenheidClassificatie = bestuurseenheidClassificatie;
  //   this.findOrganisationNamesTask.perform(searchText);
  // }

  teardown() {
    // this.findOrganisationNamesTask.cancelAll();
  }

  async findOrganisationNamesTask(searchText) {
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

    const bestuurseenheden = await this.store.query('bestuurseenheid', queryParams);
    this.bestuureenheidNamen = [
      ...bestuurseenheden.getEach('naam')
    ];
  }
}

export default class SelectBestuurseenheidNaamComponent extends Component {
  // @use bestuureenheidNamen = new BestuureenheidsNamen(() => [this.args.bestuurseenheidClassificatie, this.searchText]);
  @use isLoadingData = new LoadDataResource(() => [this.args.bestuurseenheidClassificatie, this.searchText]);
  @tracked searchText = '';

  @restartableTask
  *search(text) {
    yield timeout(200); // Timeout for debouncing

    console.log('searching')
    this.searchText = text;
  }
}
