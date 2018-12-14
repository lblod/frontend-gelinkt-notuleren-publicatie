import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('bestuurseenheid', {
      include: 'classificatie',
      page: {
        size: 500
      }
    });
  },
});
