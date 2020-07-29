/**
 * Array shuffle method
 *
 * @param {Array} array array to shuffle
 *
 * @return {Array} suffled array
 */
export const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/**
 * Get random value between 2 numbers
 *
 * @param {Number} min
 * @param {Number} max
 *
 * @return {Number}
 */
export const rollPure = (min, max) => {
  // return (min || 0) + Math.floor(Math.random() * ((max || 20) - (min || 0)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * return true if check >= random requested number
 *
 * @param {Number} check minimun value
 * @param {Number} min
 * @param {Number} max
 */
export const rollDice = (check, min, max) => {
  const roll = rollPure(min || 1, max || 20)
  return roll >= check;
};
