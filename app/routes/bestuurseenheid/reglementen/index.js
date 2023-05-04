import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ReglementenIndexRoute extends Route {
  @service fastboot;
  queryParams = {
    page: {
      refreshModel: true,
    },
    to: {
      refreshModel: false,
    },
    from: {
      refreshModel: false,
    },
  };

  model(params) {
    return params;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.bestuurseenheid = this.modelFor('bestuurseenheid');
    if (this.fastboot.isFastBoot) {
      this.fastboot.deferRendering(controller.fetchMeetings.perform());
    } else {
      controller.fetchMeetings.perform();
    }
  }
}
