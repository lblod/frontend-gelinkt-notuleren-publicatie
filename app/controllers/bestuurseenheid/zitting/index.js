import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default class BestuurseenheidZittingIndexController extends Controller {
  @alias('model.agendapunten.firstObject.publications.firstObject.createdOn')
  agendaPublicationDate;

  @alias('model.besluiten.firstObject.publications.firstObject.createdOn')
  besluitenlijstPublicationDate;

  @alias('model.notulen.publications.firstObject.createdOn')
  notulenPublicationDate;
}
