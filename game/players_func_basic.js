const con = require('./constants');
const properties = require('./properties');

class functions_basic {
	roll_die() {
		main.reset_prompt();
		var die1 = Math.floor(Math.random() * 6) + 1;
		var die2 = Math.floor(Math.random() * 6) + 1;
		document.getElementById('div_die_1').innerHTML = die1;
		document.getElementById('div_die_2').innerHTML = die2;

		if (this.double_die >= 2) {
			this.move(10);
			this.in_jail = true;
			main.print_message(`${this.avatar} rolled 3 doubles in a row and will go to jail.`);
			this.double_die = 0;
		} else {
			this.move(die1 + die2, true);
			if (die1 == die2) {
				this.double_die += 1;
				main.print_message(`${this.avatar} rolled a double and will roll again.`)
				//TODO: add a check for double_die in move to reroll after everything's done
			} else {
				this.double_die = 0;
			}
		}
	}
	//todo: fix default behaviour below
	buy(prop = properties.tiles[this.position], bid = null) {
		if (bid == null) {
			var cost = prop.cost;
		} else {
			var cost = bid;
		}
		if (this.money >= cost) {
			this.money -= cost;
			prop.owner = this;
			var title = `Purchase successful!`
			var msg = `You now own ${prop.name}.`;
			main.reset_prompt();
			main.print_prompt(msg, title);
			main.print_message(`${this.avatar} now owns ${prop.name}.`)
		} else {
			doc = document.getElementById('div_prompt_add');
			doc.style.display = 'block';
			doc.innerHTML = 'Not enough money.';
		}
		main.draw_players();
	}
	move(position, die = false) {
		main.reset_prompt();
		var p = properties;
		if (die) {
			this.position += position;
			if (this.position >= 40) {
				this.money += con.GO_SALARY;
				main.print_message(`${this.avatar} passed GO and collected $${con.GO_SALARY} as their salary.`);
				main.draw_players();
			}
			this.position %= 40;
		} else {
			this.position = position;
		}
		var cur_tile = p.tiles[this.position];
		if (p.availables.includes(cur_tile)) {
			if (cur_tile.owner !== null && cur_tile.owner !== this) {
				this.pay_rent(cur_tile);
			} else if (cur_tile.owner === this) {
				var title = 'Already owned by you.';
				var msg = 'Check the sidebar to buy houses/hotels.';
				main.print_prompt(msg, title);
			} else {
				main.print_message(`${cur_tile.name} doesn't have an owner.`);
				var title = 'Purchase property?';
				var msg = `${cur_tile.name} costs $${cur_tile.cost}. Purchase?`;
				var end = `<button onclick='players.avatars[0].buy();'>Yes</button> <button onclick='players.avatars[0].auction();'>No</button>`;
				main.print_prompt(msg, title, end);
			}
		} else if (p.decks.includes(cur_tile)) {
			//chance, chest
		} else if (p.taxes.includes(cur_tile)) {
			if (this.money >= cur_tile.cost) {
				this.money -= cur_tile.cost;
				main.print_message(`${this.avatar} paid $${cur_tile.cost} in ${cur_tile.name}.`);
				main.draw_players();
			} else {
				main.print_message('mortage stuff');
			}
		} else if (p.miscs.includes(cur_tile)) {
			switch (cur_tile) {
				case p.miscs[0]:
					break;
				case p.miscs[1]:
					main.print_message(`${this.avatar} is visiting jail.`);
				case p.miscs[2]:
					break;
				case p.miscs[3]:
					this.move(10);
					this.in_jail = true;
					main.print_message(`${this.avatar} visited go to jail space and will go to jail.`);
					//TODO: make a separate function to handle jail
					break;
				default:
			}
		}
		main.draw_positions();
	}
	pay_rent(prop = properties.tiles[this.position]) {
		var p = properties;
		var rent;
		if (p.props.includes(prop)) {
			var houses = prop.houses;
			if (prop.house_count >= 1) {
				rent = houses[prop.house_count - 1];
				main.print_message(`${prop.name} has ${prop.house_count} houses. Rent is $${rent}.`);
			} else if (prop.has_hotel) {
				rent = prop.hotel;
				main.print_message(`${prop.name} has a hotel. Rent is $${rent}.`);
			} else {
				rent = prop.rent;
				main.print_message(`Rent of ${prop.name} is $${rent}.`);
			}
		} else if (p.stations.includes(prop)) {
			var station_count = 0;
			p.stations.forEach((station) => {
				if (station.owner == prop.owner) {
					station_count += 1;
				}
			});
			switch (station_count) {
				case 4:
					rent = 200;
					break;
				case 3:
					rent = 100;
					break;
				case 2:
					rent = 50;
					break;
				default:
					rent = 25;
			}
			main.print_message(`${prop.owner.avatar} owns ${station_count} station(s). Rent is $${rent}.`);
		} else {
			//4x dice if 1 owned, 10x dice if 2.
			//prompt to roll die?
			var util_count = 0;
			p.utils.forEach((util) => {
				if (util.owner == prop.owner) {
					util_count += 1;
				}
			});
			if (util_count == 2) {
				main.print_message(`${prop.owner.avatar} owns both of the utilities. Roll die and pay 10 times.`);
				console.log('roll here for 2');
			} else {
				main.print_message(`${prop.owner.avatar} owns one of the utilities. Roll die and pay 4 times.`);
				console.log('roll here for 1');
			}
		}
		if (this.money >= rent) {
			this.money -= rent;
			prop.owner.money += rent;
			main.print_message(`${this.avatar} has paid ${prop.owner.avatar} a total of $${rent}.`);
		} else {
			main.print_message(`${this.avatar} doesn't have enough money to pay the rent.`);
			//mortgage stuff
		}
		main.draw_players();
	}
	auction(prop = null) {
		main.print_message('auction. for now just closes the prompt.');
		main.reset_prompt();
	}
}

module.exports = functions_basic;
