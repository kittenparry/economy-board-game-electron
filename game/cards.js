const fs = require('fs');
const os = require('os');
const con = require('./constants');

class Card {
	constructor(name, description, id) {
		this.name = name;
		this.description = description;
		this.id = id;
	}
}
chests = [];
chances = [];

make_cards = () => {
	path = con.PREPATH + 'card/';
	e = con.ENCODING;
	cc_names = fs.readFileSync(path + 'community_chests.txt', e).split(os.EOL);
	c_names = fs.readFileSync(path + 'chances.txt', e).split(os.EOL);
	for (i = 0; i < cc_names.length; i++) {
		chests.push(new Card("chest", cc_names[i], i));
		chances.push(new Card("chance", c_names[i], i));
	}
};

shuffle_cards = () => {
	chests.sort(() => Math.random() - 0.5);
	chances.sort(() => Math.random() - 0.5);
};

module.exports = {
	chests,
	chances,
	make_cards,
	shuffle_cards,
};
