import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  agendaPublicationDate: alias('model.agendapunten.firstObject.publications.firstObject.createdOn'),
  besluitenlijstPublicationDate: alias('model.besluiten.firstObject.publications.firstObject.createdOn'),
  notulenPublicationDate: alias('model.notulen.publications.firstObject.createdOn')
});
