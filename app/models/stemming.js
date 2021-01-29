import Model, { attr, hasMany } from '@ember-data/model';

export default class StemmingModel extends Model {

  @attr("number") aantalOnthouders;
  @attr("number") aantalTegenstanders;
  @attr("number") aantalVoorstanders;
  @attr geheim;
  // @attr title;
  @attr("string") gevolg;
  @attr("string") onderwerp;
}
