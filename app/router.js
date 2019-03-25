import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('bestuurseenheid', { path: '/:bestuurseenheid_naam/:bestuurseenheid_classificatie_code_label' }, function() {
    this.route('zitting', { path: '/:id' }, function() {
      this.route('agenda', function() {});
      this.route('besluitenlijst', function() {});
      this.route('notulen', function() {});
      this.route('bekendmakingen');
    });
  });
  this.route('contact');

  this.route('legaal', function() {
    this.route('disclaimer');
    this.route('cookieverklaring');
  });
  this.route('route-not-found', { path: '/404' });
});

export default Router;
