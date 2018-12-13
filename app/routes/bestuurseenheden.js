import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('bestuurseenheid', {
      page: {
        size: 500
      }
    }, {
      include: 'classificatie'
    });
  },
});
