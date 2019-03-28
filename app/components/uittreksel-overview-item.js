import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads }  from '@ember/object/computed';

export default Component.extend({
  bvap: reads('uittreksel.behandelingVanAgendapunt'),
  besluit: computed('uittreksel.behandelingVanAgendapunt.besluiten.@each.id', function(){
    if(!this.uittreksel.get('behandelingVanAgendapunt.besluiten')) return null;
    return this.uittreksel.get('behandelingVanAgendapunt.besluiten').firstObject;
  })
});
