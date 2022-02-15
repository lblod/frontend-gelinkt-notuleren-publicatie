import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {restartableTask} from 'ember-concurrency';
const PAGE_SIZE = 10;

const UNIT_CLASS_TO_BODY_CLASS_MAP = {
  'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001': [ // gemeente
    {uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/4955bd72cd0e4eb895fdbfab08da0284',
     label:'Burgemeester'
    },
    {uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000005',
     label: 'Gemeenteraad'
    },
    {uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000006',
     label: "College van Burgemeester en Schepenen"
    },
  ],
  'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000002': [ //ocmw
    {uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/53c0d8cd-f3a2-411d-bece-4bd83ae2bbc9',
     label: "Voorzitter van het Bijzonder Comité voor de Sociale Dienst"
    },
    {uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000007',
     label: "Raad voor Maatschappelijk Welzijn"
    },
    {uri:  'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000008',
     label: "Vast Bureau"
    },
    {uri:  'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000009',
     label: "Bijzonder Comité voor de Sociale Dienst"
    },
  ],
  'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000000': [ //provincie
    {uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e00000c',
     label: "Provincieraad"
    },
    {uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/180a2fba-6ca9-4766-9b94-82006bb9c709',
     label: "Gouverneur"
    },
    {uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e00000d',
     label: "Deputatie"
    },
  ]
};

export default class BestuurseenheidIndexController extends Controller {
  @tracked from;
  @tracked to;
  @tracked administrativeBodyClassURI;
  @tracked page = 0;
  @tracked bestuurseenheid;
  @tracked model;
  today = (new Date()).toISOString().substring(0, 10);
  queryParams = [
    'from',
    'to',
    'administrativeBodyClassURI',
    'page'
  ];

  get administrativeBodyClass() {
    const selected =  this.administrativeBodyClassOptions.find((record) => record.uri === this.administrativeBodyClassURI);
    return selected;
  }

  get administrativeBodyClassOptions() {
    const options = UNIT_CLASS_TO_BODY_CLASS_MAP[this.bestuurseenheid.get('classificatie.uri')]; //using get because ember-data
    return options ? options : [];
  }

  @action
  selectAdministrativeBodyClass(classification) {
    this.administrativeBodyClassURI = classification ? classification.uri : undefined;
    this.page = 0;
    this.fetchMeetings.perform();
  }

  @action
  updateTimeRange(fromOrTo, date) {
    if (fromOrTo === 'from')
      this.from = date;
    else
      this.to = date;
    this.page = 0;
    this.fetchMeetings.perform();
  }

  @restartableTask
  * fetchMeetings() {
    let startDate;
    if (this.from) {
      startDate = new Date(this.from);
      startDate.setDate(startDate.getDate() - 1);
      startDate = startDate.toISOString().substring(0, 10) + "T00:00:00";
    }
    let endDate;
    if (this.to) {
      endDate = this.to + "T00:00:00";
    }
    this.model = null;
    const model = yield this.store.query('zitting', {
      include: [
        'bestuursorgaan.is-tijdsspecialisatie-van',
        'notulen',
        'besluitenlijst',
        'uittreksels',
        'agendas',
      ].join(),
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][bestuurseenheid][:id:]': this.bestuurseenheid.id,
      'filter[:gte:gestart-op-tijdstip]': startDate,
      'filter[:lte:gestart-op-tijdstip]': endDate,
      'filter[bestuursorgaan][is-tijdsspecialisatie-van][classificatie][:uri:]': this.administrativeBodyClassURI,
      sort: '-geplande-start',
      page: {
        number: this.page || 0,
        size: PAGE_SIZE
      }
    });
    const pageNumber = Number(this.page) || 0;
    model.meta.page = pageNumber;
    model.meta.pageStart = pageNumber * PAGE_SIZE + 1;
    model.meta.pageEnd = (pageNumber + 1) * PAGE_SIZE;
    if(model.meta.pageEnd > model.meta.count) {
      model.meta.pageEnd = model.meta.count;
    }
    if(pageNumber !== 0) {
      model.meta.previousPage = pageNumber - 1;
    }
    if((pageNumber + 1) * PAGE_SIZE < model.meta.count ) {
      model.meta.nextPage = pageNumber + 1;
    }
    this.model = model;

  }
}

