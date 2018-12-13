import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('route-not-found', {
    path: '/*wildcard'
  });
  this.route('bestuurseenheden');
  this.route('bestuurseenheid', { path: '/:bestuurseenheid_id/:bestuurseenheid_classificatie_code_id' }, function() {
    this.route('zitting', { path: '/:id' }, function() {
      this.route('agenda');
      this.route('besluitenlijst', function() {
        this.route('show', { path: '/:behandeling_id' });
      });
      this.route('notulen');
    });
  });
});

export default Router;
