import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | zitting/besluitenlijst', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:zitting/besluitenlijst');
    assert.ok(route);
  });
});
