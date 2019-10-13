const fs = require('fs');
const os = require('os');
const con = require('./constants');

class Availables {
	constructor(name, cost, position) {
		this.name = name;
		this.cost = cost;
		this.position = position;
	}
}
class Property extends Availables {
	constructor(name, cost, position, colour, houses, hotel, rent) {
		super(name, cost, position);
		this.colour = colour;
		this.houses = houses;
		this.hotel = hotel;
		this.owner = null;
		this.house_count = 0;
		this.has_hotel = false;
		this.rent = rent; //rent is doubled if all colours are owned (even if mortgaged)
		this.is_mortgaged = false;
	}
}
class Deck {
	constructor(name, position) {
		this.name = name;
		this.position = position;
	}
}
class Station extends Availables {
	constructor(name, cost, position) {
		super(name, cost, position);
		this.owner = null;
	}
}
class Util extends Availables {
	constructor(name, cost, position) {
		super(name, cost, position);
		this.owner = null;
	}
}
class Tax extends Availables {
	constructor(name, cost, position) {
		super(name, cost, position);
	}
}
class Misc {
	constructor(name, position) {
		this.name = name;
		this.position = position;
	}
}
props = [];
decks = [];
stations = [];
utils = [];
taxes = [];
miscs = [];
tiles = [];
availables = [];

prep = con.PREPATH;
e = con.ENCODING;
make_props = () => {
	let path = prep + 'property/';
	let names = fs.readFileSync(path + 'names.txt', e).split(os.EOL);
	let costs = fs.readFileSync(path + 'costs.txt', e).split(os.EOL).map(Number);
	let positions = fs.readFileSync(path + 'positions.txt', e).split(os.EOL).map(Number);
	let colours = fs.readFileSync(path + 'colours.txt', e).split(os.EOL);
	let houses = fs.readFileSync(path + 'houses.txt', e).split(os.EOL);
	let hotels = fs.readFileSync(path + 'hotels.txt', e).split(os.EOL).map(Number);
	let rents = fs.readFileSync(path + 'rents.txt', e).split(os.EOL).map(Number);
	for (i = 0; i < names.length; i++) {
		props.push(new Property(names[i], costs[i], positions[i], colours[i], houses[i].split(" ").map(Number), hotels[i], rents[i]));
	}
};
make_decks = () => {
	let path = prep + 'deck/';
	let names = fs.readFileSync(path + 'names.txt', e).split(os.EOL);
	let positions = fs.readFileSync(path + 'positions.txt', e).split(os.EOL).map(Number);
	for (i = 0; i < names.length; i++) {
		decks.push(new Deck(names[i], positions[i]));
	}
};
make_stations = () => {
	let path = prep + 'station/';
	let names = fs.readFileSync(path + 'names.txt', e).split(os.EOL);
	let costs = 200;
	let positions = fs.readFileSync(path + 'positions.txt', e).split(os.EOL).map(Number);
	for (i = 0; i < names.length; i++) {
		stations.push(new Station(names[i], costs, positions[i]));
	}
};
make_utils = () => {
	let names = ['Electric Company', 'Water Works'];
	let costs = 150;
	let positions = [12, 28];
	for (i = 0; i < names.length; i++) {
		utils.push(new Util(names[i], costs, positions[i]));
	}
};
make_taxes = () => {
	let names = ['Income Tax', 'Luxury Tax'];
	let costs = [200, 100];
	let positions = [4, 38];
	for (i = 0; i < names.length; i++) {
		taxes.push(new Tax(names[i], costs[i], positions[i]));
	}
};
make_miscs = () => {
	let names = ["GO", "In Jail/Just Visiting", "Free Parking", "Go to Jail"];
	let positions = [0, 10, 20, 30];
	for (i = 0; i < names.length; i++) {
		miscs.push(new Misc(names[i], positions[i]));
	}
};
make_tiles = () => {
	let combined = props.concat(decks, stations, utils, taxes, miscs);
	for (i = 0; i < 40; i++) {
		combined.forEach(function(item) {
			if (item.position == i) {
				tiles.push(item);
			}
		});
	}
};
make_availables = () => {
	let combined = props.concat(stations, utils);
	for (i = 0; i < 40; i++) {
		combined.forEach(function(item) {
			if (item.position == i) {
				availables.push(item);
			}
		});
	}
};

module.exports = {
	props,
	decks,
	stations,
	utils,
	taxes,
	miscs,
	tiles,
	availables,
	make_props,
	make_decks,
	make_stations,
	make_utils,
	make_taxes,
	make_miscs,
	make_tiles,
	make_availables,
};
