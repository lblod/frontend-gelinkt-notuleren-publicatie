/* eslint-disable ember/no-computed-properties-in-native-classes */
import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default class BestuurseenheidZittingIndexController extends Controller {
  get zitting() {
    return this.model;
  }

  @alias('model.agendapunten.firstObject.publications.firstObject.createdOn')
  agendaPublicationDate;

  @alias('model.besluiten.firstObject.publications.firstObject.createdOn')
  besluitenlijstPublicationDate;

  @alias('model.notulen.publication.createdOn')
  notulenPublicationDate;
}
