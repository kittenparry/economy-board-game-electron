const properties = require('./properties');
const cards = require('./cards');
const players = require('./players');

class Game {
	constructor(player_count) {
		this.player_count = player_count;
		this.turn = 1;
		this.make_players();
		this.make_makes();
	}
	make_players() {
		players.avatars.push(new players.Player('P1', false));
		players.avatars.push(new players.Player('P2', true));
		players.avatars.push(new players.Player('P3', true));
		players.avatars.push(new players.Player('P4', true));
		/* temporarily disabled
		for(i=1;i<this.player_count;i++){
		  players.avatars.push(new players.Player(`P${i}`, true));
		}
		*/
	}
	make_makes() {
		properties.make_props();
		properties.make_decks();
		properties.make_stations();
		properties.make_utils();
		properties.make_taxes();
		properties.make_miscs();
		properties.make_tiles();
		properties.make_availables();
		cards.make_cards();
		cards.shuffle_cards();
	}
}

module.exports = Game;
