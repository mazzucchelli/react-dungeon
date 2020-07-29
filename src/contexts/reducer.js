import { handleCardStatus } from "../helpers/mapHelpers";
import INITIAL_STATE from "./initials";

export default function reducer(state, action) {
  const { payload } = action;

  switch (action.type) {
    // BASE
    case "game-start":
      return {
        ...state,
        config: {
          ...state.config,
          started: true,
        },
      };
    case "game-over":
      return INITIAL_STATE;
    case "item-mode":
      return {
        ...state,
        config: {
          ...state.config,
          itemMode: payload.isItemMode,
        },
        player: payload.isItemMode
          ? {
              ...state.player,
              pendingAction: payload.data,
            }
          : { ...state.player, pendingAction: {} },
      };
    case "select-player":
      return {
        ...state,
        config: { ...state.config, selectedCharacter: true },
        player: payload,
      };
    // DUNGEON
    case "update-dungeon":
      return {
        ...state,
        dungeon: payload,
      };
    case "floor-change":
      console.log('floor-change":, nothing happend');
      return { ...state };

    // PLAYER
    case "player-move":
      const { x, y } = payload;
      const { can_see, can_move } = state.player;
      const updatedDungeon = handleCardStatus(state.dungeon, [x, y], {
        can_see,
        can_move,
      });
      return {
        ...state,
        config: {
          ...state.config,
          currentFloor: x,
        },
        dungeon: updatedDungeon,
        player: {
          ...state.player,
          position: [x, y],
        },
      };
    case "player-stats":
      return {
        ...state,
        player: {
          ...state.player,
          stats: { ...payload },
        },
      };
    case "player-coins":
      return {
        ...state,
        player: {
          ...state.player,
          coins: payload,
        },
      };
    case "player-inventory":
      return {
        ...state,
        player: {
          ...state.player,
          inventory: payload,
        },
      };
    case "enemy-stats":
      console.log('enemy-stats":, nothing happend');
      return { ...state };
    case "fight":
      return {
        ...state,
        dungeon: payload.dungeon,
        player: payload.player,
      };

    // TRIGGERS
    case "update-counters":
      console.log("update-counters, nothing happend");
      return { ...state };

    default:
      console.log(
        "default, nothing happend",
        "state",
        state,
        "action",
        JSON.stringify(action)
      );
      return { ...state };
  }
}
