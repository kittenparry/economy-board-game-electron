//probably need to be adjusted for main.js working one folder above.
//or just move main.js here?
//sys
const PREPATH = __dirname + '/info/';
const ENCODING = 'utf8';

//maybe separate them to constants-game.js?
//ingame
const MAX_HOUSES = 32;
const MAX_HOTELS = 12;
const GO_SALARY = 200;

module.exports = {
	PREPATH,
	ENCODING,
	MAX_HOUSES,
	MAX_HOTELS,
	GO_SALARY,
};
