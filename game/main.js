const games = require('./games');
const players = require('./players')

var game = new games(4);
document.getElementById('div_players').innerHTML += players.avatars[0].avatar;
