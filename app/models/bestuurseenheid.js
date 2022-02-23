import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr uri;
  @attr naam;

  @belongsTo('bestuurseenheid-classificatie-code', {
    inverse: null,
  })
  classificatie;
  @hasMany('bestuursorgaan', {
    inverse: null,
  })
  bestuursorganen;
}
