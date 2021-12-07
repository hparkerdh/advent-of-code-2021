export class BingoBoardFoundation {

  constructor(_adapter) {
    this._adapter = _adapter;
    this._bingo = false;
  }

  connectedCallback() {
    this._valueListener = event => {
      this.selectValue(event.detail)
    }
    this._adapter.listenForValue(this._valueListener);
  }

  disconnectedCallback() {
    this._adapter.stopListeningForValue(this._valueListener);
  }

  getUnsetSum() {
    return [0, 1, 2, 3, 4].reduce((result, c) => {
      return result + [1, 2, 3, 4, 5].reduce((rowResult, r) => {
        return rowResult + (this._adapter.isCellSelected(c, r) ? 0 : this._adapter.getCellValue(c, r));
      }, 0);
    }, 0);
  }
  
  selectValue(val) {
    if (!this._bingo) {
      for (let c = 0; c < 5; c++) {
        for (let r = 1; r < 6; r++) {
          if (val == this._adapter.getCellValue(c, r)) {
            this._adapter.selectCell(c, r);
            if (this._checkBoard(val)) return;
          }
        }
      }
    }
  }

  setBoard(fileChunk) {
    fileChunk.split('\n').forEach((line, row) => {
      line.split(' ').filter(v => v !== '').forEach((val, col) => {
        if (col < 5 && row < 5) {
          this._adapter.setCell(col, row+1, val);
        }
      });
    });
  }

  setId(id) {
    this._adapter.title = this._adapter.title + ' ' + id;
  }

  _checkBoard(val) {
    for (let c = 0; c < 5; c++) {
      if ([1, 2, 3, 4, 5].reduce((winner, curr) => {
        return winner && this._adapter.isCellSelected(c, curr);
      }, true)) {
        this._bingo = true;
        this._adapter.emitWinEvent(val);
        return true;
      }
    }
    for (let r = 1; r < 6; r++) {
      if ([0, 1, 2, 3, 4].reduce((winner, curr) => {
        return winner && this._adapter.isCellSelected(curr, r);
      }, true)) {
        this._bingo = true;
        this._adapter.emitWinEvent(val);
        return true;
      }
    }
    return false;
  }
}
