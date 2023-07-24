import EmberRouter from '@ember/routing/router';
import config from 'frontend-gelinkt-notuleren-publicatie/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route(
    'bestuurseenheid',
    {
      path: '/:bestuurseenheid_naam/:bestuurseenheid_classificatie_code_label',
    },
    function () {
      this.route('reglementen', function () {
        this.route('reglement', { path: '/:uittreksel_id' });
      });
      this.route('zittingen', function () {
        this.route('zitting', { path: '/:zitting_id' }, function () {
          this.route('agenda', function () {
            this.route('raw');
          });
          this.route('besluitenlijst', function () {});
          this.route('notulen', function () {});
          this.route('uittreksels', function () {
            this.route('index', { path: '/' });
            this.route('detail', { path: '/:uittreksel_id' }, function () {
              this.route('raw');
            });
          });
        });
      });
      // Route created for backwards compatibility, redirects to `bestuurseenheid.zittingen.zitting`
      this.route('zitting', { path: '/:zitting_id' }, function () {
        this.route('index', { path: '/' });
        this.route('wildcard', { path: '/*path' });
      });
    }
  );
  this.route('contact');

  this.route('legaal', function () {
    this.route('disclaimer');
    this.route('cookieverklaring');
    this.route('toegankelijkheidsverklaring');
  });
  this.route('sparql');
  this.route('route-not-found', { path: '/404' });
});
