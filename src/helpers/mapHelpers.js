import shortid from "shortid";

import dungeons from "../mocks/dungeons.json";
import { shuffle } from "./utilities";
import levels from "../mocks/levels.json";
import generators from "./Generator";
import playerView from "./playerView";

const { ItemAPI, EggAPI, FightAPI, PotionAPI } = generators;

const findCards = (coords, schema) => {
  const finder = playerView[schema];
  const [x, y] = coords;
  return finder(x, y);
};

export const handleCardStatus = (dungeon, coords, schemas) => {
  const [x, y] = coords;
  const { can_see, can_move } = schemas;
  const discoverArr = findCards(coords, can_see);
  const availableArr = findCards(coords, can_move);

  return dungeon.map((row) => {
    return row.map((cell) => {
      return {
        ...cell,
        discovered:
          !cell.discovered && discoverArr.includes(cell.coords)
            ? true
            : cell.discovered,
        available: availableArr.includes(cell.coords) && !cell.completed,
        completed:
          !cell.completed && cell.coords === `${x} - ${y}`
            ? true
            : cell.completed,
      };
    });
  });
};

const dungeonList = (composition) => {
  const arr = [];
  for (const [key, value] of Object.entries(composition)) {
    for (let i = 0; i < value; i++) {
      // console.log("key, value", key, value);
      const dungeon = dungeons.filter((d) => d.type === key)[0];
      arr.push(dungeon);
    }
  }

  // console.log("arr", arr);

  const mixed = shuffle(shuffle(shuffle(arr)));
  return mixed;
};

export const generateDungeon = (lvl, startIndex) => {
  const randomMap = [];
  const { rows, cols } = lvl.size;
  const availables = dungeonList(lvl.composition);

  // console.log("lvl.composition", lvl.composition);

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        ...availables[0],
        id: shortid.generate(),
        coords: `${startIndex + i} - ${j}`,
      });
      availables.splice(0, 1);
    }

    randomMap.push(row);
  }

  // console.log("----");
  // console.log(randomMap);
  // console.log("----");

  // prevent void for final boss side cells
  return randomMap;
};

export const generateFirstRows = (dungeonMap, lvl) => {
  const currentLevel = (lvl || 0).toString();
  const foundRows = levels[currentLevel].firstRows;
  const rowLength = levels[currentLevel].size.cols;

  foundRows.forEach((el, i) => {
    const { notVoid, composition } = el;
    const data = dungeonList(composition);

    const voidTiles = data.filter((el) => el.type === "void");
    const notVoidTiles = data.filter((el) => el.type !== "void");

    const row = [];
    for (let j = 0; j < rowLength; j++) {
      if (notVoid.includes(j)) {
        row.push({
          ...notVoidTiles[0],
          id: shortid.generate(),
          coords: `${foundRows.length - 1 - i} - ${j}`,
        });
        notVoidTiles.splice(0, 1);
      } else {
        row.push({
          ...voidTiles[0],
          id: shortid.generate(),
          coords: `${foundRows.length - 1 - i} - ${j}`,
        });
        voidTiles.splice(0, 1);
      }
    }

    const rowWithTilesData = generateTilesByRow(row);
    dungeonMap.unshift(rowWithTilesData);
  });

  // console.log("first", dungeonMap);

  return dungeonMap;
};

export const generateLastRows = (dungeonMap, lvl) => {
  const currentLevel = (lvl || 0).toString();
  const foundRows = levels[currentLevel].lastRows;
  const rowLength = levels[currentLevel].size.cols;

  // console.log(foundRows);

  foundRows.forEach((el) => {
    const i = dungeonMap.length;
    const { notVoid, composition } = el;
    const data = dungeonList(composition);

    const voidTiles = data.filter((el) => el.type === "void");
    const notVoidTiles = data.filter((el) => el.type !== "void");

    const row = [];
    for (let j = 0; j < rowLength; j++) {
      if (notVoid.includes(j)) {
        row.push({
          ...notVoidTiles[0],
          id: shortid.generate(),
          coords: `${i} - ${j}`,
        });
        notVoidTiles.splice(0, 1);
      } else {
        row.push({
          ...voidTiles[0],
          id: shortid.generate(),
          coords: `${i} - ${j}`,
        });
        voidTiles.splice(0, 1);
      }
    }

    const rowWithTilesData = generateTilesByRow(row);
    dungeonMap.push(rowWithTilesData);
  });

  // console.log("last", dungeonMap);

  return dungeonMap;
};

export const generateTiles = (dungeonMap, lvl) => {
  return dungeonMap.map((row) => {
    return row.map((cell) => {
      switch (cell.type) {
        case "chest":
          return {
            ...cell,
            data: [ItemAPI.getItem()],
          };
        case "egg":
          return {
            ...cell,
            data: EggAPI.getItem(),
          };
        case "fight":
          return {
            ...cell,
            data: FightAPI.getItem(),
          };
        case "potion":
          return {
            ...cell,
            data: PotionAPI.getItem(),
          };
        default:
          return cell;
      }
    });
  });
};

export const generateTilesByRow = (dungeonRow, lvl) => {
  return dungeonRow.map((cell) => {
    switch (cell.type) {
      // case "empty":
      //   return {
      //     ...cell,
      //     data: [GeneratorAPI.getEmpty()],
      //   };
      case "chest":
        return {
          ...cell,
          data: [ItemAPI.getItem()],
        };
      case "egg":
        return {
          ...cell,
          data: EggAPI.getItem(),
        };
      case "fight":
        return {
          ...cell,
          data: FightAPI.getItem(),
        };
      case "potion":
        return {
          ...cell,
          data: PotionAPI.getItem(),
        };
        case "shop":
          return {
            ...cell,
            data: [ItemAPI.getItem(), ItemAPI.getItem(), ItemAPI.getItem(), ItemAPI.getItem()],
          };
      default:
        // console.log("generate no type", cell);
        return cell;
    }
  });
};

/**
 * set params form on level start, like discovered and availables
 *
 * @param {Array} grid GameContext.game.dungeon
 */
export const initialCardsStats = (grid) => {
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

/**
 * Parse dungeon and apply changes
 *
 * @param {Array} dungeon GameContext.game.dungeon
 * @param {Object} coords? tile coordinates { x, y } to modify, if null all tiles will be modified
 * @param {Function} modifier modifier function (tile) => {{ ...tile, <your-stuff>}}
 *
 * @return {Array} GameContext.game.dungeon
 */
export const mapDungeonGrid = (dungeon, coords, modifier) => {
  if (coords) {
    const { x, y } = coords;
    return dungeon.map((row, i) => {
      if (i === x) {
        return row.map((tile, j) => {
          if (j === y) {
            return modifier(tile);
          } else {
            return tile;
          }
        });
      } else {
        return row;
      }
    });
  } else {
    return dungeon.map((row) => {
      return row.map((tile) => {
        return modifier(tile);
      });
    });
  }
};

/**
 * Used for "active" item mode, eneble [...tile].target: true
 *
 * @param {String} type undiscovered
 * @param {Object} ctx GameContext.game
 *
 * @return {Array} GameContext.game.dungeon
 */
export const getTargetTiles = (type, ctx) => {
  switch (type) {
    case "undiscovered":
      return mapDungeonGrid(ctx.dungeon, null, (tile) => {
        if (!tile.discovered) {
          return { ...tile, target: true };
        } else {
          return tile;
        }
      });
    default:
      break;
  }
};

/**
 * Generate tiles based on current level
 *
 * @param {String} currentLevel
 *
 * @return {Array} GameContex.game
 */
export const createDungeoun = (currentLevel) => {
  const START_INDEX = 2;
  const baseMap = generateDungeon(levels[currentLevel], START_INDEX);
  const mapWithTilesData = generateTiles(baseMap, currentLevel);
  const mapWithFirstRow = generateFirstRows(mapWithTilesData, currentLevel);
  const mapWithLastRow = generateLastRows(mapWithFirstRow, currentLevel);
  const createdDungeon = initialCardsStats(mapWithLastRow);
  // console.log("created Dungeon", mapWithLastRow);
  return createdDungeon;
};
