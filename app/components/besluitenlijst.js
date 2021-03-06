import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class BesluitenlijstComponent extends Component {
  @service store;

  @tracked extraBesluiten = [];
  @tracked currentPage = 0;
  @tracked nextPage;
  @tracked lastPage;

  constructor() {
    super(...arguments);

    const meta = this.args.besluiten.meta;
    const lastPage = meta.pagination.last.number;
    if (lastPage > 0) {
      this.nextPage = 1;
    }
  }

  @task
  *fetchBesluiten(page = 0) {
    const besluiten = yield this.store.query('besluit', {
      page: {
        number: page,
        size: 100
      },
      "filter[besluitenlijst][:id:]": this.args.besluitenlijst.id,
      sort: "volgend-uit-behandeling-van-agendapunt.onderwerp.position"
    });

    this.extraBesluiten = [
      ...this.extraBesluiten,
      ...besluiten.toArray(),
    ]

    const meta = besluiten.meta;
    this.lastPage = meta.pagination.last.number;
    this.currentPage = page;
    if (this.lastPage > this.currentPage) {
      this.nextPage, this.currentPage + 1;
    }
  }
}

