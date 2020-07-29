import reducer from "../contexts/reducer";

export const allItems = [
  {
    name: "inspect",
    slug: "inspect",
    sprite: "",
    description: "inspect unknown card",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "inspect",
        active: true,
        payload: {
          target: ["undiscovered"],
          dispatch: "update-dungeon",
          getPayload: (dungeon, { x, y }) => {
            return dungeon.map((row, i) => {
              if (i === x) {
                return row.map((tile, j) => {
                  if (j === y) {
                    return {
                      ...tile,
                      discovered: true,
                    };
                  } else {
                    return tile;
                  }
                });
              } else {
                return row;
              }
            });
          },
        },
      },
    ],
  },
  {
    name: "pay for shield",
    slug: "pay-for-shield-10-10",
    sprite: "",
    description: "pay 10 coins for 10 shield",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "pay-coins",
        payload: 10,
      },
      {
        type: "player-stats",
        payload: {
          shield: 10,
        },
      },
    ],
  },
  {
    name: "more power",
    slug: "increased-att-2",
    sprite: "",
    description: "gain +2 attack",
    quantity: 2,
    probability: 4,
    actions: [
      {
        type: "player-stats",
        payload: {
          att: 2,
        },
      },
    ],
  },
];
