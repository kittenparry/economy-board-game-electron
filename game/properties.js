const fs = require('fs');

class Property extends Availables{
  constructor(name, cost, position, colour, houses, hotel, rent){
    super(name, cost, position);
    this.colour = colour;
    this.houses = houses;
    this.hotel = hotel;
    this.owner = null;
    this.house_count = 0;
    this.has_hotel = false;
    this.rent = rent
    this.is_mortgaged = false;
  }
}
class Availables{
  constructor(name, cost, position){
    this.name = name;
    this.cost = cost;
    this.position = position;
  }
}
class Deck{
  constructor(name, position){
    this.name = name;
    this.position = position;
  }
}
class Station extends Availables{
  constructor(name, cost, position){
    super(name, cost, position);
    this.owner = null;
  }
}
class Util extends Availables{
  constructor(name, cost, position){
    super(name, cost, position);
    this.owner = null;
  }
}
class Tax extends Availables{
  constructor(name, cost, position){
    super(name, cost, position);
  }
}
class Misc{
  constructor(name, position){
    this.name = name;
    this.position = position;
  }
}
exports.properties = [];
exports.decks = [];
exports.stations = [];
exports.utils = [];
exports.taxes = [];
exports.miscs = [];
exports.tiles = [];
exports.availables = [];

exports.make_properties = function(){
  
}