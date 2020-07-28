export const allItems = [
    {
        name: "inspect",
        slug: "inspect",
        sprite: "",
        description: "inspect unknown card",
        quantity: 2,
        probability: 4,
        active: true,
        actions: [
            {
                type: 'inspect',
                target: ["undiscovered"],
            },
        ]
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
                type: 'pay-coins',
                payload: 10
            },
            {
                type: 'player-stats',
                payload: {
                    shield: 10
                }
            },
        ]
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
                type: 'player-stats',
                payload: {
                    att: 2
                }
            }
        ]
    }
]
