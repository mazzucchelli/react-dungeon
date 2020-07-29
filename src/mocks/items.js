import { mapDungeonGrid } from "../helpers/mapHelpers";
import { updatePlayerStats } from "../helpers/playerHelpers";

export const allItems = [
  {
    name: "inspect",
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
    name: "HP potion small",
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
                HP:
                  game.player.stats.HP +
                  Math.round((game.player.stats.maxHP * 15) / 100),
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "HP potion medium",
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
          getPayload: (game) => updatePlayerStats(
            {
              HP:
                game.player.stats.HP +
                Math.round((game.player.stats.maxHP * 30) / 100),
            },
            game
          ),
        },
      },
    ],
  },
  {
    name: "HP potion large",
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
          getPayload: (game) => updatePlayerStats(
            {
              HP:
                game.player.stats.HP +
                Math.round((game.player.stats.maxHP * 60) / 100),
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
