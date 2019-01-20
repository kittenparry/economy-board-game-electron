const games = require('./games');
const players = require('./players');
const main = require('./main_window');
const properties = require('./properties');

var game = new games(4);
main.draw_all();
properties.props[0].owner = players.avatars[1];
main.draw_positions();
