import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class BesluitenlijstComponent extends Component {
  @service store;
  @service fastboot;

  get rawHtmlContent() {
    return this.args.besluitenlijst.inhoud;
  }
  get treatedHtml() {
    // DO NOT INITIALIZE THIS AHEAD OF TIME!
    // DOMParser does not exist in a fastboot context, so it will crash
    // using it here in the getter is fine cause the template doesn't call it when
    // it's in fastboot mode
    const domParser = new DOMParser();
    const newDom = domParser.parseFromString(this.rawHtmlContent, 'text/html');
    const decisions = newDom.body.querySelectorAll(
      '[typeof*="besluit#Besluit"]'
    );
    decisions.forEach((decision) => {
      // the portal element for the button to render in
      const portalElement = newDom.createElement('div');
      portalElement.id = this.portalId(decision);

      // a wrapper to hold the decision and the button together
      const containerElement = newDom.createElement('span');
      containerElement.classList.add('besluit-container');

      // replace decision element with wrapper
      // in this order, otherwise replacing is a bit more clumsy
      decision.replaceWith(containerElement);
      containerElement.append(decision, portalElement);

      // check if decision has a description
      const description = decision.querySelector(
        '[property="eli:description"]'
      );
      if (!description) {
        // add an explainer message if no description exists
        const descNotFound = newDom.createElement('p');
        descNotFound.classList.add(
          'au-c-help-text',
          'au-c-help-text--secondary'
        );
        descNotFound.appendChild(new Text('Korte beschrijving niet gevonden'));
        decision.appendChild(descNotFound);
      }
    });
    return { html: newDom.body.outerHTML, decisions };
  }

  // we need to look for the portals again,
  // even though we technically already have references to them
  // this is because the in-element helper only works if the element you give it is already rendered
  // when we give the refs directly in the template, that's too early cause the elements haven't
  // yet rendered
  getWrapper = (decisionElement) => {
    const id = this.portalId(decisionElement);
    const element = document.getElementById(id);
    return element;
  };

  portalId(decisionElement) {
    return `portal-for#${decisionElement.getAttribute('resource')}`;
  }
}
