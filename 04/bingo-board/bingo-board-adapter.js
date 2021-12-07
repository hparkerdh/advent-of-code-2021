
export class BingoBoardAdapter {
  constructor (_component) {
    this._component = _component;
  }

  deselectCell(col, row) {
    this.getCell(col, row).classList.remove('selected');
  }

  emitWinEvent(detail) {
    this._component.dispatchEvent(new CustomEvent('bingo-board-winner', { detail, bubbles: true }));
  }

  getCell(col, row) {
    return this._component.shadowRoot.querySelectorAll('tr').item(row).querySelectorAll('td').item(this._translateBingo(col));
  }

  getCellValue(col, row) {
    return Number(this.getCell(col, row).innerText);
  }

  isCellSelected(col, row) {
    return this.getCell(col, row).classList.contains('selected');
  }

  listenForValue(cb) {
    this._component.parentElement.addEventListener('bingo-game-value', cb);
  }

  selectCell(col, row) {
    this.getCell(col, row).classList.add('selected');
  }

  setCell(col, row, val) {
    this.getCell(col, row).innerText = val;
  }

  stopListeningForValue(cb) {
    this._component.parentElement.removeEventListener('bingo-game-value', cb);
  }

  get title() {
    return this._component.shadowRoot.querySelector('span').innerText;
  }
  set title(val) {
    this._component.shadowRoot.querySelector('span').innerText = val;
  }

  _translateBingo(col) {
    if (typeof col === 'string') {
      switch (col.trim().toUpperCase()) {
        case 'B': return 0;
        case 'I': return 1;
        case 'N': return 2;
        case 'G': return 3;
        case 'O': return 4;
        default: return 0;
      }
    }
    if (typeof col === 'number') {
      return col < 5 ? col >= 0 ? col : 0 : 4;
    }
    return 0;
  }
}
