import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | html-safe', function(hooks) {
  setupRenderingTest(hooks);

  test('it works', async function(assert) {
    this.set('htmlString', `<div data-test>Some text</div>`);

    await render(hbs`{{html-safe this.htmlString}}`);

    assert.dom('[data-test]').containsText('Some text');
  });
});
