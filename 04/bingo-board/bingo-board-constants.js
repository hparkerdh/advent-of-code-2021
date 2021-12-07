export let BOARD_HTML = document.createElement('template');
BOARD_HTML.innerHTML = `
<style>
  .bingo-board {
    display: flex;
    flex-direction: column;
    text-align: center;
    border-width: 4px;
    border-color: lightgray;
    border-style: solid;
    padding: 4px;
    margin: 4px;
    max-width: 200px;
  }
  .selected {
    background-color: green;
    color: white;
  }
</style>
<div class="bingo-board">
  <span>Bingo Board</span>
  <table>
    <tr>
      <th>B</th>
      <th>I</th>
      <th>N</th>
      <th>G</th>
      <th>O</th>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table>
</div>
`;
