import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | bestuurseenheid/zitting/agenda/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:bestuurseenheid/zitting/agenda/index');
    assert.ok(route);
  });
});
