import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';


export default class BestuurseenheidIndexRoute extends Route {
  @service fastboot;
  queryParams = {
    page: {
      refreshModel: true
    },
    to: {
      refreshModel: false
    },
    from: {
      refreshModel: false
    },
    administrativeBodyClassURI: {
      refreshModel: false
    }
  }

  model(params) {
    return params;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.bestuurseenheid =this.modelFor('bestuurseenheid');
    if (this.fastboot.isFastBoot) {
      this.fastboot.deferRendering(controller.fetchMeetings.perform());
    }
    else {
      controller.fetchMeetings.perform();
    }
  }
}
