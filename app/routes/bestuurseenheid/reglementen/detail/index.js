import Route from '@ember/routing/route';

export default class ReglementenDetailIndexRoute extends Route {
  async model() {
    const uittreksel = this.modelFor('bestuurseenheid.reglementen.detail');
    const publication = uittreksel.get('publication');

    return {
      uittreksel,
      publication,
    };
  }
}
