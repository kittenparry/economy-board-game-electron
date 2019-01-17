const properties = require('./properties');
const cards = require('./cards');
const players = require('./players');

properties.make_properties();
properties.make_decks();
properties.make_stations();
properties.make_utils();
properties.make_taxes();
properties.make_miscs();
properties.make_tiles();
properties.make_availables();
cards.make_cards();
cards.shuffle_cards();
p1 = new players.Player('Gordon', false);
console.log(p1);
