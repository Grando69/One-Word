/**
 *
 * @param { number } lenght
 * @returns { string } Id
 */
function makeId(lenght) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < lenght; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
/**
 *
 * @param { string[] } players
 * @param { string } currentPlayer
 * @returns { string } nextPlayer
 */
function calculateNextTurn(players, currentPlayer) {
  // if (!(currentPlayer in players)) return;
  if (currentPlayer < players.length)
    return (parseInt(currentPlayer) + 1).toString();
  else if (currentPlayer == players.length) return "1";
}

module.exports = {
  makeId,
  calculateNextTurn,
};
