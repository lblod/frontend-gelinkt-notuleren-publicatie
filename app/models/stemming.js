import Model, { attr } from '@ember-data/model';

export default class StemmingModel extends Model {
  @attr aantalOnthouders;
  @attr aantalTegenstanders;
  @attr aantalVoorstanders;
  @attr geheim;
  // @attr title;
  @attr gevolg;
  @attr onderwerp;
  @attr uri;
}
