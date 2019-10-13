func_basic = require('./players_func_basic');

class Player extends func_basic {
	constructor(avatar, is_ai) {
		super();
		this.money = 1500;
		this.position = 0;
		this.avatar = avatar;
		this.double_die = 0;
		this.is_ai = is_ai;
		this.bid = 0;
		// TODO: probably a better way than this for auction?
		this.get_out_of_jail = 0;
		this.in_jail = false;
		this.in_jail_turn = 0;
		// start from 0, increment each time the turn is player's, require payment on third one if not a double die
		this.is_bankrupt = false;
	}
}
avatars = [];

module.exports = {
	Player,
	avatars,
};
