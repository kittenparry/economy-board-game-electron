const games = require('./games');
const players = require('./players');
const main = require('./main_window');

var game = new games(4);
main.draw_all();
players.avatars[0].position = 5;
main.draw_positions();
players.avatars[0].position = 10;
players.avatars[1].position = 5;
main.draw_positions();
