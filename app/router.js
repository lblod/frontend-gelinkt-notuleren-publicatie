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
  this.route('bestuurseenheid', { path: '/:bestuurseenheid_naam/:bestuurseenheid_classificatie_code_label' }, function() {
    this.route('zitting', { path: '/:id' }, function() {
      this.route('agenda');
      this.route('besluitenlijst', function() {
        this.route('show', { path: '/:behandeling_id' });
      });
      this.route('notulen');
      this.route('show');
    });
  });
  this.route('contact');

  this.route('legaal', function() {
    this.route('disclaimer');
    this.route('cookieverklaring');
  });
});

export default Router;
