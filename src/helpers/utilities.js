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

export const rollPure = (min, max) => {
  // return (min || 0) + Math.floor(Math.random() * ((max || 20) - (min || 0)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const rollDice = (check, min, max) => {
  const roll =
    (min || 1) + Math.floor(Math.random() * ((max || 20) - (min || 1) + 1));
  return roll >= check;
};
