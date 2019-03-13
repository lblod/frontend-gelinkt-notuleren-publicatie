import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
    this.breadCrumb = this.breadCrumb || { title: 'Notulen' };
  },

  model() {
    return this.modelFor('bestuurseenheid.zitting');
  }
});
