export const allItems = [
    {
        name: "pay for shield",
        slug: "pay-for-shield-10-10",
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
