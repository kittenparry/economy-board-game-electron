//probably need to be adjusted for main.js working one folder above.
//or just move main.js here?
//sys
PREPATH = __dirname + '/info/';
ENCODING = 'utf8';

//maybe separate them to constants-game.js?
//ingame
MAX_HOUSES = 32;
MAX_HOTELS = 12;
GO_SALARY = 200;

module.exports = {
	PREPATH,
	ENCODING,
	MAX_HOUSES,
	MAX_HOTELS,
	GO_SALARY,
};
