import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
export default Component.extend({
  besluiten: null,
  tagName: '',
  store: service(),
  fetchBesluiten:  task(function * (page = 0) {
    const besluiten = yield this.store.query('besluit', { page: {number: page, size: 100}, "filter[besluitenlijst][:id:]": this.besluitenlijst.id, sort: "volgend-uit-behandeling-van-agendapunt.onderwerp.position" });
    besluiten.forEach((besluit) => this.extraBesluiten.pushObject(besluit));
    const meta = besluiten.meta;
    const last = meta.pagination.last.number;
    this.last = meta.pagination.last.number;
    this.page = page;
    if (this.last > this.page) {
      this.set('nextPage', this.page + 1);
    }
  }),

  willRender() {
    const meta = this.besluiten.meta;
    const last = meta.pagination.last.number;
    if (last > 0) {
      this.set('nextPage', 1);
    }
    this.set('extraBesluiten', A());
  }
});

