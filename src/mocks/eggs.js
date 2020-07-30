import { updatePlayerStats } from "../helpers/playerHelpers";

export const allEggs = [
  {
    name: "..mh",
    slug: "heal+1",
    description: "",
    quantity: 1,
    probability: 5,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: 1,
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "..mmh",
    slug: "heal+2",
    description: "",
    quantity: 1,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: 2,
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "..mmmh",
    slug: "heal+3",
    description: "",
    quantity: 1,
    probability: 3,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: 3,
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "..mmmmh",
    slug: "heal+4",
    description: "",
    quantity: 1,
    probability: 2,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: 4,
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "..mmmmmh",
    slug: "heal+5",
    description: "",
    quantity: 1,
    probability: 1,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: 5,
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "..mh",
    slug: "heal-1",
    description: "",
    quantity: 1,
    probability: 5,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: -1,
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "..mmh",
    slug: "heal-2",
    description: "",
    quantity: 1,
    probability: 4,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: -2,
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "..mmmh",
    slug: "heal-3",
    description: "",
    quantity: 1,
    probability: 3,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: -3,
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "..mmmmh",
    slug: "heal-4",
    description: "",
    quantity: 1,
    probability: 2,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: -4,
              },
              game
            ),
        },
      },
    ],
  },
  {
    name: "..mmmmmh",
    slug: "heal-5",
    description: "",
    quantity: 1,
    probability: 1,
    actions: [
      {
        type: "instant",
        params: {
          event: "player-stats",
          getPayload: (game) =>
            updatePlayerStats(
              {
                HP: -5,
              },
              game
            ),
        },
      },
    ],
  },
];
