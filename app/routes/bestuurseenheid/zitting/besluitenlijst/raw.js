import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const id = this.modelFor('bestuurseenheid.zitting').get('id');
    const besluitenlijsten = await this.store.query('besluitenlijst', {
      'filter[zitting][id]': id,
      page: {
        size: 1
      }
    });
    return besluitenlijsten.firstObject;
  }
});
