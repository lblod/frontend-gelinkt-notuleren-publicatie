import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;
  get environmentName() {
    return getOwner(this).resolveRegistration('config:environment')
      .environmentName;
  }

  get showEnvironment() {
    return (
      this.environmentName !== '' &&
      this.environmentName !== '{{ENVIRONMENT_NAME}}'
    );
  }
}
