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
  var temp = ''
  avatars.forEach(function(avatar){
    temp += `<div class='player_profile'>${avatar.avatar} $${avatar.money}</div>`
    doc.innerHTML = temp;
  });
}
function draw_mid(){
  game_mid = document.getElementById('game_mid');
  game_mid.innerHTML += `<button onclick='players.avatars[0].roll_die();'>roll die</button>`;
  game_mid.innerHTML += `<div id='div_dies'><div class='div_die' id='div_die_1'></div><div class='div_die' id='div_die_2'></div><span id='div_double_die'></div></div>`;
}
function draw_positions(){
  avatars = players.avatars;
  //looks very inefficient
  for(i=0;i<40;i++){
    document.getElementById(`tile_stop_${i}`).innerHTML = '';
  }
  avatars.forEach(function(avatar){
    doc = document.getElementById(`tile_stop_${avatar.position}`).innerHTML += `${avatar.avatar}`;
  });
}
function print_message(msg){
  news = document.getElementById('activity_feed');
  news.innerHTML = `<li>${msg}</li>${news.innerHTML}`;
}
function print_prompt(msg, title = '', end = ''){
  doc_prompt = document.getElementById('div_prompt');
  doc_title = document.getElementById('div_prompt_title');
  doc_body = document.getElementById('div_prompt_body');

  doc_prompt.style.display = 'block';
  if(title != ''){
    doc_title.style.display = 'block';
    doc_title.innerHTML = title;
  }else{
    doc_title.style.display = 'none';
  }
  doc_body.innerHTML = `<p>${msg}</p> ${end}`;
}
function reset_prompt(){
  doc_prompt = document.getElementById('div_prompt');
  doc_title = document.getElementById('div_prompt_title');
  doc_add = document.getElementById('div_prompt_add');

  doc_prompt.style.display = 'none';
  doc_title.style.display = 'none';
  doc_add.style.display = 'none';
}
function draw_all(){
  draw_board();
  draw_sidebar();
  draw_tiles();
  draw_players();
  draw_mid();
  draw_positions();
}
module.exports = {
  draw_all: draw_all,
  draw_positions: draw_positions,
  draw_players: draw_players,
  print_message: print_message,
  print_prompt: print_prompt,
  reset_prompt: reset_prompt,
};
