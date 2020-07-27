// FIXME: potions can only have 1 action

export const allPotions = [
  {
    name: "HP+ potion",
    slug: "HP+potion",
    sprite: "PotionH",
    frames: 7,
    description: "",
    quantity: 30,
    probability: 20,
    actions: [
      {
        type: "player-stats",
        payload: { HP: 2 },
      },
    ]
  },
  {
    name: "shield+ potion",
    slug: "shield+potion",
    sprite: "PotionI",
    frames: 7,
    description: "",
    quantity: 30,
    probability: 15,
    actions: [
      {
        type: "player-stats",
        payload: { shield: 3 },
      },
    ]
  },
  {
    name: "HP+ shield- potion",
    slug: "HP+shield-potion",
    sprite: "PotionH",
    frames: 7,
    description: "",
    quantity: 30,
    probability: 15,
    actions: [
      {
        type: "player-stats",
        payload: { HP: 3,
        shield: -1 },
      },
    ]
  },
  {
    name: "HP- shield+ potion",
    slug: "HP-shield+potion",
    sprite: "PotionI",
    frames: 7,
    description: "",
    quantity: 30,
    probability: 15,
    actions: [
      {
        type: "player-stats",
        payload: {
          HP: -1,
          shield: 3,
        },
      },
    ]
  },
  {
    name: "Att+ potion",
    slug: "att+potion",
    sprite: "PotionG",
    frames: 7,
    description: "",
    quantity: 30,
    probability: 13,
    actions: [
      {
        type: "player-stats",
        payload: { HP: 1 },
      },
    ]
  },
  {
    name: "MaxHP+ potion",
    slug: "MaxHP+potion",
    sprite: "PotionJ",
    frames: 7,
    description: "",
    quantity: 30,
    probability: 13,
    actions: [
      {
        type: "player-stats",
        payload: { maxHP: 2 },
      },
    ]
  },
];
