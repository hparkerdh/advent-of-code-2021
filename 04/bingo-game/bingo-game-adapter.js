export class BingoGameAdapter {
  constructor(_component) {
    this._component = _component;
  }

  addBingoBoard(fileChunk, id) {
    const board = document.createElement('bingo-board');
    board.setBoard(fileChunk);
    board.id = id;
    board.setId(id);
    this._component.appendChild(board);
  }

  addTitle(text) {
    const span = document.createElement('span');
    span.innerText = text;
    this._component.insertAdjacentElement('afterbegin', span);
  }

  addWinListener(cb) {
    this._component.addEventListener('bingo-board-winner', event => cb(event.target, event.detail));
  }

  emitValue(detail) {
    this._component.dispatchEvent(new CustomEvent('bingo-game-value', { detail }));
  }
}
