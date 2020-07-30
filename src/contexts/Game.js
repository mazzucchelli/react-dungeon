import React, { useEffect, useReducer, useState, useRef } from "react";
import INITIAL_STATE from "./initials";
import reducer from "./reducer";
// import levels from "../mocks/levels.json";
import { rollDice } from "../helpers/utilities";
import {
  // generateDungeon,
  // generateTiles,
  // generateFirstRows,
  // generateLastRows,
  // initialCardsStats,
  // mapDungeonGrid,
  getTargetTiles,
} from "../helpers/mapHelpers";

export const GameContext = React.createContext();

export const GameProvider = ({ children }) => {
  /**
   * game global state
   */
  const [game, dispatch] = useReducer(reducer, INITIAL_STATE);

  /**
   * prevFloor value, used by scroll effet to move "camera"
   */
  const [prevFloor, setPrevFloor] = useState(0);

  /**
   * Reference of grid container, used by scroll effet to move "camera"
   */
  const gridRef = useRef(null);

  /**
   *
   * @param {object} data dispatch params { type, payload } to invoke
   * @param  {...any} rest console.log everything else
   */
  const dispatcher = (data, ...rest) => {
    console.log("👀", ...rest);
    dispatch(data);
  };

  /**
   * update scroll on player move up (TODO: to improve)
   */
  useEffect(() => {
    const { position } = game.player;
    const { currentFloor } = game.config;

    if (position && currentFloor !== prevFloor) {
      setPrevFloor(currentFloor);
      if (currentFloor > 1) {
        gridRef.current.scrollTo(0, gridRef.current.scrollTop - 162);
      }
    }
  }, [game.player, game.config]);

  // /**
  //  * mount component effect
  //  */
  // useEffect(() => {
  //   const dungeon = createDungeoun(game.config.currentLevel);
  //   dispatcher(
  //     {
  //       type: "update-dungeon",
  //       payload: dungeon,
  //     },
  //     "update-dungeon"
  //   );
  // }, []);

  /**
   * Game over effect
   * if HP === 0 || (no tiles availables && (TODO) no items that can create a new tile)
   */
  useEffect(() => {
    if (!game.config.started) return;

    const { player, dungeon } = game;
    const HPcheck = player.stats.HP <= 0;
    let availableTiles = [];

    // TODO: exit loop
    dungeon.forEach((row, i) => {
      const founds = row.filter(
        (tile) => tile.available && tile.type !== "void"
      );
      if (founds.length > 0) {
        availableTiles.push(...founds);
      }
    });

    if (HPcheck || availableTiles.length === 0) {
      dispatcher(
        {
          type: "game-over",
        },
        "game-over"
      );
    }
  }, [game.player, game.dungeon]);

  /**
   * Update dungeon and player with fight result
   *
   * @param {Object} data enemy data (tile.data)
   * @param {Number} x enemy row
   *
   * @return {Object} { dungeon: updatedDungeon, player: updatedPlayer };
   */
  const handleFight = (data, x) => {
    const { dungeon, player } = game;
    const searchedRow = dungeon.filter((row, i) => i === x)[0];
    const target = searchedRow.filter(
      (target) => target.data && target.data.id === data.id
    )[0];
    let elusionSuccess = true;

    if (target.data.stats.elusion) {
      elusionSuccess = rollDice(target.data.stats.elusion);
    }

    if (elusionSuccess) {
      if (target.data.stats.shield > 0) {
        const res = target.data.stats.shield - player.stats.att;
        target.data.stats.shield = res < 0 ? 0 : res;
      } else {
        target.data.stats.HP -= player.stats.att;
      }
    }

    const updatedDungeon = dungeon.map((row, i) => {
      if (i === x) {
        return row.map((cell) => {
          if (cell.data && cell.data.id === data.id) {
            return target;
          } else {
            return cell;
          }
        });
      } else {
        return row;
      }
    });

    const updatedPlayer = player;
    if (target.data.stats.HP > 0) {
      if (updatedPlayer.stats.shield > 0) {
        const res = updatedPlayer.stats.shield - target.data.stats.att;
        updatedPlayer.stats.shield = res < 0 ? 0 : res;
      } else {
        updatedPlayer.stats.HP -= target.data.stats.att;
      }
    }

    return {
      dungeon: updatedDungeon,
      player: updatedPlayer,
    };
  };

  /**
   * <dispatcher>
   *
   * Move character to coords
   *
   * @param {obj} coords { x, y }
   */
  const characterMove = ({ x, y }) => {
    dispatcher(
      {
        type: "player-move",
        payload: { x, y },
      },
      `moved to x:${x}, y:${y}`
    );
  };

  /**
   * <dispatcher>
   *
   * dispatch consumable action
   *
   * params: {
   *   event<String>: dispatcher event
   *   target<String>: getTargetTiles() cases
   *   getPayload<Function>: return dispatcher payload
   * }
   *
   * @param {Object} args { type: "instant | active", params: (see above) }
   */
  const handleAction = ({ type, params }) => {
    switch (type) {
      // case "pay-coins":
      //   if (game.player.coins >= payload) {
      //     const updatedCoins = game.player.coins - payload;
      //     dispatcher(
      //       {
      //         type: "player-coins",
      //         payload: updatedCoins,
      //       },
      //       "update coins",
      //       payload,
      //       updatedCoins
      //     );
      //   }
      //   break;
      // case "player-stats":
      //   const updatedPlayerStats = updatePlayerStats(payload);
      //   // console.log(updatedPlayerStats);
      //   dispatcher(
      //     {
      //       type: "player-stats",
      //       payload: updatedPlayerStats,
      //     },
      //     "update stats",
      //     payload,
      //     updatedPlayerStats
      //   );
      //   break;
      case "instant":
        dispatcher(
          {
            type: params.event,
            payload: params.getPayload(game),
          },
          `used "instant" item`,
          params
        );
        break;
      case "active":
        const dungeonWithTargets = getTargetTiles(params.target[0], game);
        dispatcher(
          {
            type: "update-dungeon",
            payload: dungeonWithTargets,
          },
          `update tiles ${params.target[0]}`,
          dungeonWithTargets
        );
        dispatcher(
          {
            type: "item-mode",
            payload: {
              isItemMode: true,
              data: params,
            },
          },
          `trigger item mode`,
          params
        );
        break;
      default:
        console.error("Unregistered action type", type, params);
        break;
    }
  };

  /**
   * <dispatcher>
   *
   * invoke consumable actions
   *
   * @param {String} itemId generated item ID (tile.data.id)
   */
  const consume = (itemId) => {
    const item = game.player.inventory.filter((item) => item.id === itemId)[0];
    // console.log(item);
    item.actions.forEach((action) => {
      handleAction(action);
    });

    const updatedInventory = game.player.inventory.filter(
      (item) => item.id !== itemId
    );

    dispatcher(
      {
        type: "player-inventory",
        payload: updatedInventory,
      },
      "update inventory",
      updatedInventory
    );
  };

  return (
    <GameContext.Provider
      value={{
        game,
        dispatch,
        dispatcher,
        handleFight,
        gridRef,
        characterMove,
        handleAction,
        consume,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
