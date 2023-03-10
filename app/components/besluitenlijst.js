import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { service } from '@ember/service';

export default class BesluitenlijstComponent extends Component {
  @service store;
  @service fastboot;

  @tracked extraBesluiten = [];
  @tracked currentPage = 0;
  @tracked lastPage;

  constructor() {
    super(...arguments);
    const meta = this.args.besluiten.meta;
    this.lastPage = meta.pagination.last.number;
  }
  get hasNext() {
    return this.nextPage <= this.lastPage;
  }
  get nextPage() {
    return this.currentPage + 1;
  }

  @task
  *fetchBesluiten(page = 0) {
    const besluiten = yield this.store.query('besluit', {
      page: {
        number: page,
        size: 100,
      },
      'filter[besluitenlijst][:id:]': this.args.besluitenlijst.id,
      sort: 'volgend-uit-behandeling-van-agendapunt.position',
    });

    this.extraBesluiten = [...this.extraBesluiten, ...besluiten.toArray()];

    const meta = besluiten.meta;
    this.lastPage = meta.pagination.last.number;
    this.currentPage = page;
  }
}
