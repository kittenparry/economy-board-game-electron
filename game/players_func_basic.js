const con = require('./constants');
const properties = require('./properties');

class functions_basic {
  roll_die(){
    var die1 = Math.floor(Math.random() * 6) + 1;
    var die2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById('div_die_1').innerHTML = die1;
    document.getElementById('div_die_2').innerHTML = die2;

    if(this.double_die >= 2){
      this.move(10);
      this.in_jail = true;
      main.print_messages(`${this.avatar} rolled 3 doubles in a row and will go to jail.`);
      this.double_die = 0;
    }else{
      this.move(die1 + die2, true);
      if(die1 == die2){
        this.double_die += 1;
        main.print_messages(`${this.avatar} rolled a double and will roll again.`)
        //TODO: add a check for double_die in move to reroll after everything's done
      }else{
        this.double_die = 0;
      }
    }
  }
  move(position, die = false){
    var p = properties;
    if(die){
      this.position += position;
      if(this.position >= 40){
        this.money += con.GO_SALARY;
        main.print_messages(`${this.avatar} passed GO and collected $${con.GO_SALARY} as their salary.`);
      }
      this.position %= 40;
    }else{
      this.position = position;
    }
    var cur_tile = p.tiles[this.position];
    if(p.availables.includes(cur_tile)){
      if(cur_tile.owner !== null && cur_tile.owner !== this){
        //owned
      }else{
        main.print_messages(`${cur_tile.name} doesn't have an owner.`);
      }
    }

    main.draw_positions();
  }
}

module.exports = functions_basic;
