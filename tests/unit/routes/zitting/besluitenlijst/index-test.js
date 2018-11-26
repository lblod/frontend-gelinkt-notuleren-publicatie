import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | zitting/besluitenlijst/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:zitting/besluitenlijst/index');
    assert.ok(route);
  });
});
