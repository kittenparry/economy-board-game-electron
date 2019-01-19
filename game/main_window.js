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
draw_board();
