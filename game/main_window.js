const properties = require('./properties');
//const players = require('./players');

function draw_board(){
  top_row = '<tr>';
  for(i=20;i<31;i++){
    top_row += `<td id='tile_${i}'>${i}</td>`;
  }
  top_row += '</tr>';
  mid_row = `<tr><td id='tile_19'>19</td>`;
  mid_row += `<td rowspan='9' colspan='9' id='game_mid'>game mid</td><td id='tile_31'>31</td></tr>`;
  for(i=18;i>10;i--){
    right_val = 50 - i;
    mid_row += `<tr><td id='tile_${i}'>${i}</td><td id='tile_${right_val}'>${right_val}</td></tr>`;
  }
  bot_row = '<tr>';
  for(i=10;i>=0;i--){
    bot_row += `<td id='tile_${i}'>${i}</td>`;
  }
  bot_row += '</tr>';
  board = document.getElementById('table_game_board');
  board.innerHTML += top_row + mid_row + bot_row;

}
function draw_sidebar(){
  tile_temp = `<tr><td><ul>
  <li>name</li>
  <li>cost/rent</li>
  <li>colour</li>
  <li>position</li>
  <li>houses</li>
  <li>hotel</li>
  <ul></td></tr>`;
  document.getElementById('table_side_top').innerHTML += tile_temp;
  document.getElementById('table_side_bot').innerHTML += tile_temp;
}
function draw_tiles(){
  tiles = properties.tiles;
  for(i=0;i<40;i++){
    tile = document.getElementById('tile_' + i);
    tile.innerHTML = '';
    if(tiles[i].colour !== undefined){
      tile.innerHTML += `<div class='colour ${tiles[i].colour}'></div>`;
    }
    tile.innerHTML += `${tiles[i].name}`;
    tile.innerHTML += `<div class='tile_stop' id='tile_stop_${i}'></div>`;
  }
}
function draw_players(){
  avatars = players.avatars;
  doc = document.getElementById('div_players');
  avatars.forEach(function(avatar){
    temp = `<div class='player_profile'>${avatar.avatar} $${avatar.money}</div>`
    doc.innerHTML += temp;
  });
}
function draw_mid(){
  game_mid = document.getElementById('game_mid');
  game_mid.innerHTML += '<button>roll die</button>';
}

draw_board();
draw_sidebar();
draw_tiles();
draw_players();
draw_mid();
