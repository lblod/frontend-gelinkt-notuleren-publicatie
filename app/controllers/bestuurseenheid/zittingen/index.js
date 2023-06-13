import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

const UNIT_CLASS_TO_BODY_CLASS_MAP = {
  'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001':
    [
      // gemeente
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/4955bd72cd0e4eb895fdbfab08da0284',
        label: 'Burgemeester',
      },
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000005',
        label: 'Gemeenteraad',
      },
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000006',
        label: 'College van Burgemeester en Schepenen',
      },
    ],
  'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000002':
    [
      //ocmw
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/53c0d8cd-f3a2-411d-bece-4bd83ae2bbc9',
        label: 'Voorzitter van het Bijzonder Comité voor de Sociale Dienst',
      },
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000007',
        label: 'Raad voor Maatschappelijk Welzijn',
      },
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000008',
        label: 'Vast Bureau',
      },
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000009',
        label: 'Bijzonder Comité voor de Sociale Dienst',
      },
    ],
  'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000000':
    [
      //provincie
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e00000c',
        label: 'Provincieraad',
      },
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/180a2fba-6ca9-4766-9b94-82006bb9c709',
        label: 'Gouverneur',
      },
      {
        uri: 'http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e00000d',
        label: 'Deputatie',
      },
    ],
};

export default class BestuurseenheidZittingenIndexController extends Controller {
  queryParams = [
    'from',
    'to',
    'administrativeBodyClassURI',
    'page',
    'pageSize',
    'sort',
  ];
  @service store;
  @tracked from;
  @tracked to;
  @tracked page = 0;
  @tracked pageSize = 10;
  @tracked sort = '-geplande-start';
  @tracked administrativeBodyClassURI;
  today = new Date().toISOString().substring(0, 10);

  get zittingen() {
    return this.model.zittingen;
  }

  get count() {
    return this.zittingen.meta.count;
  }

  get bestuurseenheid() {
    return this.model.bestuurseenheid;
  }

  get administrativeBodyClass() {
    return this.administrativeBodyClassOptions.find(
      (record) => record.uri === this.administrativeBodyClassURI
    );
  }

  get administrativeBodyClassOptions() {
    return (
      UNIT_CLASS_TO_BODY_CLASS_MAP[
        this.bestuurseenheid.get('classificatie.uri')
      ] || []
    );
  }

  get formattedFrom() {
    return this.from?.substring(0, 10);
  }

  get formattedTo() {
    return this.to?.substring(0, 10);
  }

  @action
  selectAdministrativeBodyClass(classification) {
    this.administrativeBodyClassURI = classification
      ? classification.uri
      : undefined;
    this.page = 0;
  }

  @action
  updateTimeRange(fromOrTo, date) {
    if (fromOrTo === 'from') {
      let startDate = new Date(date);
      startDate.setDate(startDate.getDate() - 1);
      startDate = startDate.toISOString().substring(0, 10) + 'T00:00:00';
      this.from = startDate;
    } else {
      this.to = date + 'T00:00:00';
    }
    this.page = 0;
  }
}
