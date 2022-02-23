import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | bestuurseenheid/zitting/notulen', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:bestuurseenheid/zitting/notulen');
    assert.ok(route);
  });
});
