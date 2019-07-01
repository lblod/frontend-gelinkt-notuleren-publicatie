import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | bestuurseenheid/zitting/uittreksels/detail/raw', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:bestuurseenheid/zitting/uittreksels/detail/raw');
    assert.ok(route);
  });
});
