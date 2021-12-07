export class BingoGameFoundation {
  constructor(_adapter) {
    this._adapter = _adapter;
    this._boardCt = 0;
    this._init = false;
    this._firstWin = false;
    this._gameOver = false;
    this._winCt = 0;
  }

  initialize() {
    if (!this._init) {
      this._init = true;
      this._adapter.addWinListener((board, selected) => {
        this._winCt++;
        if (!this._firstWin) {
          this._firstWin = true;
          this._adapter.addTitle(`Board ${board.id} won on number ${selected}! Final score: ${selected * board.getUnsetSum()}`);
        }
        if (this._winCt === this._boardCt) {
          this._gameOver = true;
          this._adapter.addTitle(`Board ${board.id} was the last to win on number ${selected}! Final score: ${selected * board.getUnsetSum()}\n`);
        }
      });
    }
  }

  playGame() {
    const vals = this._choices.split(',')

    const nextVal = () => {
      if (!this._gameOver && vals.length > 0) {
        this._adapter.emitValue(Number(vals.shift()));

        setTimeout(nextVal, 500);
      }
    }

    nextVal();
  }

  setGameData(fileText) {
    const lines = fileText.split('\n');
    this._choices = lines[0];

    let boardRow = 0;
    let ct = 2;
    let currBoard = '';

    while (ct < lines.length) {
      if (boardRow < 5) {
        currBoard += `${lines[ct]}\n`;
        boardRow++;
      } else {
        this._boardCt++;
        this._adapter.addBingoBoard(currBoard, this._boardCt);
        boardRow = 0;
        currBoard = '';
      }
      ct++;
    }
  }
}
