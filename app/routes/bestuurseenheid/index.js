import Route from '@ember/routing/route';

export default Route.extend({
  afterModel(zittingen/*, transition*/) {
    if (zittingen.get('length') > 0) {
      this.transitionTo('bestuurseenheid.zitting.zitting', zittingen.get('firstObject.id'));
    }
  }
});
