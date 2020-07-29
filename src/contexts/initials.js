const INITIAL_STATE = {
  config: {
    started: false,
    currentFloor: 0,
    currentLevel: 0,
    selectedCharacter: false,
    itemMode: false,
  },
  player: {},
  dungeon: [],
  potions: {},
  items: {},
  pills: {},
  logs: ['context loaded']
};

export default INITIAL_STATE;
