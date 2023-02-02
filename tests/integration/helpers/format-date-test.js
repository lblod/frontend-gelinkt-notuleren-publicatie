import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | format-date', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it renders the formatted date', async function (assert) {
    this.set('inputValue', new Date('2021-07-01'));

    await render(hbs`{{format-date inputValue "d MMMM yyyy"}}`);

    assert.strictEqual(this.element.textContent.trim(), '1 juli 2021');
  });
});
