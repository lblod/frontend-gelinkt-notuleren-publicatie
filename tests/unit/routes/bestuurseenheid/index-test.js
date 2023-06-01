import { module, test } from 'qunit';
import { setupTest } from 'frontend-gelinkt-notuleren-publicatie/tests/helpers';

module('Unit | Route | bestuurseenheid/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:bestuurseenheid/index');
    assert.ok(route);
  });
});
