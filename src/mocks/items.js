import { mapDungeonGrid } from "../helpers/mapHelpers";
import { updatePlayerStats } from "../helpers/playerHelpers";
import generators from "../helpers/Generator";

// 00 . create-empty-tile
// 00 . reveal-enemies
// 00 . reveal-eggs
// 00 . reveal-chests
// 00 . reveal-potions
// 00 . reveal-shops
// 00 . inspect
// 00 . HP potion small
// 00 . HP potion medium
// 00 . HP potion large

export const allItems = [
  {
    name: "inspect",
    price: 10,
    slug: "inspect",
    image: "scrollDetect",
    description: "inspect unknown card",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "active",
        params: {
          target: ["undiscovered"],
          event: "update-dungeon",
          getPayload: (game, { x, y }) =>
            mapDungeonGrid(game.dungeon, { x, y }, (tile) => {
              return { ...tile, discovered: true };
            }),
        },
      },
    ],
  },
  {
    name: "create empty tile",
    price: 10,
    slug: "create-empty-tile",
    image: "scrollDetect",
    description: "create empty tile",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "active",
        params: {
          target: ["void"],
          event: "update-dungeon",
          getPayload: (game, { x, y }) =>
            mapDungeonGrid(game.dungeon, { x, y }, () => {
              const emptyTile = generators.GeneratorAPI.getEmpty();
              return { ...emptyTile, coords: `${x} - ${y}`, discovered: true };
            }),
        },
      },
    ],
  },
  {
    name: "reveal-enemies",
    price: 10,
    slug: "reveal-enemies",
    image: "scrollDetect",
    description: "reveal all enemies",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "update-dungeon",
          getPayload: (game) =>
            mapDungeonGrid(game.dungeon, null, (tile) => {
              if (tile.type === "fight") {
                return { ...tile, discovered: true };
              } else {
                return tile;
              }
            }),
        },
      },
    ],
  },
  {
    name: "reveal-eggs",
    price: 10,
    slug: "reveal-eggs",
    image: "scrollDetect",
    description: "reveal all eggs",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "update-dungeon",
          getPayload: (game) =>
            mapDungeonGrid(game.dungeon, null, (tile) => {
              if (tile.type === "egg") {
                return { ...tile, discovered: true };
              } else {
                return tile;
              }
            }),
        },
      },
    ],
  },
  {
    name: "reveal-chests",
    price: 10,
    slug: "reveal-chests",
    image: "scrollDetect",
    description: "reveal all chests",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "update-dungeon",
          getPayload: (game) =>
            mapDungeonGrid(game.dungeon, null, (tile) => {
              if (tile.type === "chest") {
                return { ...tile, discovered: true };
              } else {
                return tile;
              }
            }),
        },
      },
    ],
  },
  {
    name: "reveal-potions",
    price: 10,
    slug: "reveal-potions",
    image: "scrollDetect",
    description: "reveal all potions",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "update-dungeon",
          getPayload: (game) =>
            mapDungeonGrid(game.dungeon, null, (tile) => {
              if (tile.type === "potion") {
                return { ...tile, discovered: true };
              } else {
                return tile;
              }
            }),
        },
      },
    ],
  },
  {
    name: "reveal-shops",
    price: 10,
    slug: "reveal-shops",
    image: "scrollDetect",
    description: "reveal all shops",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "update-dungeon",
          getPayload: (game) =>
            mapDungeonGrid(game.dungeon, null, (tile) => {
              if (tile.type === "shop") {
                return { ...tile, discovered: true };
              } else {
                return tile;
              }
            }),
        },
      },
    ],
  },
  {
    name: "HP potion small",
    price: 10,
    slug: "HP-potion-small",
    image: "TinyRedPotion",
    description: "heal 15% of max HP",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: Math.round((game.player.stats.maxHP * 15) / 100),
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "HP potion medium",
    price: 10,
    slug: "HP-potion-medium",
    image: "MediumPotionRed",
    description: "heal 30% of max HP",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: Math.round((game.player.stats.maxHP * 30) / 100),
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "HP potion large",
    price: 10,
    slug: "HP-potion-large",
    image: "LargePotionRed",
    description: "heal 60% of max HP",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: Math.round((game.player.stats.maxHP * 60) / 100),
              },
              game
            ),
        },
      },
    ],
  },

  // {
  //   name: "pay for shield",
  //   slug: "pay-for-shield-10-10",
  //   sprite: "",
  //   description: "pay 10 coins for 10 shield",
  //   quantity: 2,
  //   probability: 4,
  //   actions: [
  //     {
  //       type: "pay-coins",
  //       payload: 10,
  //     },
  //     {
  //       type: "player-stats",
  //       payload: {
  //         shield: 10,
  //       },
  //     },
  //   ],
  // },
  // {
  //   name: "more power",
  //   slug: "increased-att-2",
  //   sprite: "",
  //   description: "gain +2 attack",
  //   quantity: 2,
  //   probability: 4,
  //   actions: [
  //     {
  //       type: "player-stats",
  //       payload: {
  //         att: 2,
  //       },
  //     },
  //   ],
  // },
];
