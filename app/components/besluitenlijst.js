import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

const FIRST_PAGE = 0;

export default class BesluitenlijstComponent extends Component {
  @service store;
  @service fastboot;

  @tracked currentPage = FIRST_PAGE;
  @tracked nextPage;
  @tracked lastPage;
  @tracked besluiten = [];

  constructor() {
    super(...arguments);

    if (this.fastboot.isFastBoot) {
      this.fastboot.deferRendering(
        this.fetchBesluiten.perform(this.currentPage)
      )
    } else {
      this.fetchBesluiten.perform(this.currentPage);
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

    this.besluiten = [
      ...this.besluiten,
      ...besluiten.toArray(),
    ];

    const meta = besluiten.meta;
    this.lastPage = meta.pagination.last.number;
    this.currentPage = page;

    if (this.lastPage > this.currentPage) {
      this.nextPage = this.currentPage + 1;
    }
  }
}

