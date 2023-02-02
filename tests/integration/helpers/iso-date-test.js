import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | iso-date', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('inputValue', new Date('2021-07-01'));

    await render(hbs`{{iso-date inputValue}}`);

    assert.strictEqual(
      this.element.textContent.trim(),
      '2021-07-01T00:00:00.000Z'
    );
  });
});
