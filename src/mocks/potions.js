import { updatePlayerStats } from "../helpers/playerHelpers";

export const allPotions = [
  {
    name: "HP+ potion",
    slug: "HP+potion",
    sprite: "PotionH",
    description: "",
    quantity: 30,
    probability: 20,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) => updatePlayerStats({ HP: 2 }, game),
        },
      },
    ],
  },
  {
    name: "shield+ potion",
    slug: "shield+potion",
    sprite: "PotionI",
    description: "",
    quantity: 30,
    probability: 15,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) => updatePlayerStats({ shield: 3 }, game),
        },
      },
    ],
  },
  {
    name: "HP+ shield- potion",
    slug: "HP+shield-potion",
    sprite: "PotionH",
    description: "",
    quantity: 30,
    probability: 15,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) => updatePlayerStats({ HP: 3, shield: -1 }, game),
        },
      },
    ],
  },
  {
    name: "HP- shield+ potion",
    slug: "HP-shield+potion",
    sprite: "PotionI",
    description: "",
    quantity: 30,
    probability: 15,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) => updatePlayerStats({ HP: -1, shield: 3 }, game),
        },
      },
    ],
  },
  {
    name: "Att+ potion",
    slug: "att+potion",
    sprite: "PotionG",
    description: "",
    quantity: 30,
    probability: 13,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) => updatePlayerStats({ att: 1 }, game),
        },
      },
    ],
  },
  {
    name: "MaxHP+ potion",
    slug: "MaxHP+potion",
    sprite: "PotionJ",
    description: "",
    quantity: 30,
    probability: 13,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) => updatePlayerStats({ maxHP: 2 }, game),
        },
      },
    ],
  },
];
