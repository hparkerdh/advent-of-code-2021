import { BingoGameAdapter } from './bingo-game-adapter.js';
import { BingoGameFoundation } from './bingo-game-foundation.js';

export class BingoGameComponent extends HTMLElement {
  constructor() {
    super();

    this._foundation = new BingoGameFoundation(new BingoGameAdapter(this));
  }

  connectedCallback() {
    this._foundation.initialize();
  }

  playGame() {
    this._foundation.playGame();
  }

  setGameData(fileText) {
    this._foundation.setGameData(fileText);
  }
}
