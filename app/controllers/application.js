import Controller from '@ember/controller';
import DefaultQueryParamsMixin from 'ember-data-table/mixins/default-query-params';

export default Controller.extend(DefaultQueryParamsMixin, {
  selectedZitting: null,
  actions: {
    openZitting(zitting) {
      this.transitionToRoute('zitting.agenda', zitting.id);
    }
  }
});
