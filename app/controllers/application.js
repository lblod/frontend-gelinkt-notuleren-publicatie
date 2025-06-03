import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import { modifier } from 'ember-modifier';

const PREFIXES = {
  lblod: 'http://data.lblod.info/vocabularies/lblod/',
  eli: 'http://data.europa.eu/eli/ontology#',
  prov: 'http://www.w3.org/ns/prov#',
  mandaat: 'http://data.vlaanderen.be/ns/mandaat#',
  besluit: 'http://data.vlaanderen.be/ns/besluit#',
  generiek: 'http://data.vlaanderen.be/ns/generiek#',
  person: 'http://www.w3.org/ns/person#',
  persoon: 'http://data.vlaanderen.be/ns/persoon#',
  dct: 'http://purl.org/dc/terms/',
  skos: 'http://www.w3.org/2004/02/skos/core#',
  org: 'http://www.w3.org/ns/org#',
  foaf: 'http://xmlns.com/foaf/0.1/',
  ext: 'http://mu.semte.ch/vocabularies/ext/',
  besluittype: 'https://data.vlaanderen.be/id/concept/BesluitType/',
  lblodBesluit: 'http://lblod.data.gift/vocabularies/besluit/',
};

const VOCAB = 'http://data.vlaanderen.be/ns/besluit#';
export default class ApplicationController extends Controller {
  setPrefixes = modifier(
    (element) => {
      const prefixString = Object.entries(PREFIXES)
        .map(([prefix, uri]) => {
          return `${prefix}: ${uri}`;
        })
        .join(' ');
      element.setAttribute('prefix', prefixString);
    },
    { eager: false }
  );

  setVocab = modifier(
    (element) => {
      element.setAttribute('vocab', VOCAB);
    },
    { eager: false }
  );

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
