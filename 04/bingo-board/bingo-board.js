import { BingoBoardAdapter } from './bingo-board-adapter.js';
import { BOARD_HTML } from './bingo-board-constants.js'
import { BingoBoardFoundation } from './bingo-board-foundation.js'

export class BingoBoardComponent extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(BOARD_HTML.content.cloneNode(true));

    this._foundation = new BingoBoardFoundation(new BingoBoardAdapter(this));
  }

  connectedCallback() {
    this._foundation.connectedCallback();
  }

  disconnectedCallback() {
    this._foundation.disconnectedCallback();
  }

  getUnsetSum() {
    return this._foundation.getUnsetSum();
  }

  selectValue(val) {
    this._foundation.selectValue(val);
  }

  setBoard(fileChunk) {
    this._foundation.setBoard(fileChunk);
  }

  setId(id) {
    this._foundation.setId(id);
  }
}
