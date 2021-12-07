import { BingoBoardComponent } from './bingo-board/index.js';
import { BingoGameComponent } from './bingo-game/index.js';

window.customElements.define('bingo-board', BingoBoardComponent);
window.customElements.define('bingo-game', BingoGameComponent);

let data = new XMLHttpRequest();
data.open('GET', 'data.txt');
data.onreadystatechange = () => {
  if (data.readyState === 4 && data.status == 200) {
    const game = document.querySelector('bingo-game');
    game.setGameData(data.responseText);
    game.playGame();
  }
}
data.send();
