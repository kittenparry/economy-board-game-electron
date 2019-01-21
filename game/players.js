func_basic = require('./players_func_basic');

class Player extends func_basic{
  constructor(avatar, ai){
    super();
    this.money = 1500;
    this.properties = [] //remove this probably?
    this.position = 0;
    this.avatar = avatar;
    this.double_die = 0;
    this.ai = ai;
    this.bid = 0;
    this.get_out_of_jail = 0;
    this.in_jail = false;
    this.is_bankrupt = false;
  }
}
avatars = [];
module.exports = {
  Player: Player,
  avatars: avatars,
};
