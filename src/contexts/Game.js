import React, { useEffect, useReducer, useState, useRef } from "react";

import reducer from "./reducer";
import levels from "../mocks/levels.json";
import {
  generateDungeon,
  generateTiles,
  generateFirstRows,
  generateLastRows,
} from "../helpers/mapHelpers";

export const GameContext = React.createContext();

const INITIAL_STATE = {
  config: {
    started: false,
    currentFloor: 0,
    currentLevel: 0,
  },
  player: {
    stats: {
      HP: 10,
      maxHP: 20,
      att: 5,
      shield: 10,
    },
    coins: 10,
    position: null, // -> coords [x, y]
    inventory: [],
    can_see: "front_round",
    can_move: "front_perimeter",
  },
  dungeon: [],
  potions: {},
  items: {},
  pills: {},
};

const initialCardsStats = (grid) => {
  // console.log(grid[0]);
  return grid.map((row, i) => {
    if (i === 0) {
      return row.map((card, i) => {
        return {
          ...card,
          discovered: true,
          available: true,
        };
      });
    } else {
      return row;
      // return row.map((card, i) => {
      //   return {
      //     ...card,
      //     discovered: true,
      //   };
      // });
    }
  });
};

const createDungeoun = (currentLevel) => {
  const START_INDEX = 1;
  const baseMap = generateDungeon(levels[currentLevel], START_INDEX);
  const mapWithTilesData = generateTiles(baseMap, currentLevel);
  const mapWithFirstRow = generateFirstRows(mapWithTilesData, currentLevel);
  const mapWithLastRow = generateLastRows(mapWithFirstRow, currentLevel);
  const createdDungeon = initialCardsStats(mapWithLastRow);
  // console.log("created Dungeon", mapWithLastRow);
  return createdDungeon;
};

export const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [prevFloor, setPrevFloor] = useState(0);
  const gridRef = useRef(null);

  useEffect(() => {
    const dungeon = createDungeoun(game.config.currentLevel);
    dispatch({
      type: "update-dungeon",
      payload: dungeon,
    });
    dispatch({ type: "game-start" });
  }, []);

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

  useEffect(() => {}, [game]);

  const updatePlayerStats = (params) => {
    const res = game.player.stats;
    for (const [key, value] of Object.entries(params)) {
      switch (key) {
        case "HP":
          const HPRes = (res[key] += value);
          res[key] = HPRes < res.maxHP ? HPRes : res.maxHP;
          break;
        case "maxHP":
          res["HP"] += value;
          res["maxHP"] += value;
          break;
        case "shield":
          const shieldRes = (res[key] += value);
          res[key] = shieldRes < 0 ? 0 : shieldRes;
          break;
        default:
          res[key] += value;
          break;
      }
    }
    return res;
  };

  const handleFight = (data, x) => {
    const { dungeon, player } = game;
    const searchedRow = dungeon.filter((row, i) => i === x)[0];
    const target = searchedRow.filter(
      (target) => target.data && target.data.id === data.id
    )[0];
    if (target.data.stats.shield > 0) {
      const res = target.data.stats.shield - player.stats.att;
      target.data.stats.shield = res < 0 ? 0 : res;
    } else {
      target.data.stats.HP -= player.stats.att;
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

  const movePlayer = ({ x, y }) => {
    dispatch({ type: "player-move", payload: { x, y } });
  };

  const handleAction = ({ type, payload }) => {
    switch (type) {
      case "pay-coins":
        if (game.player.coins >= payload) {
          const updatedCoins = game.player.coins - payload;
          dispatch({ type: "player-coins", payload: updatedCoins });
        }
        break;
      case "player-stats":
        const updatedPlayerStats = updatePlayerStats(payload);
        // console.log(updatedPlayerStats);
        dispatch({ type: "player-stats", payload: updatedPlayerStats });
        break;
      default:
        console.log("!! unregistered action", type, payload);
        break;
    }
  };

  const consume = (itemId) => {
    const item = game.player.inventory.filter((item) => item.id === itemId)[0];
    // console.log(item);
    item.actions.forEach((action) => {
      handleAction(action);
    });

    const updatedInventory = game.player.inventory.filter(
      (item) => item.id !== itemId
    );
    dispatch({ type: "player-inventory", payload: updatedInventory });
  };

  return (
    <GameContext.Provider
      value={{
        game,
        dispatch,
        handleFight,
        updatePlayerStats,
        gridRef,
        movePlayer,
        handleAction,
        consume,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
