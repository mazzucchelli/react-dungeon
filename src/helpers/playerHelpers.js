/**
 * Update player stats (and side stats)
 *
 * @param {Object} params player stats to update
 * @param {Object} ctx GameContext.game
 *
 * @return player stats
 */
export const updatePlayerStats = (params, ctx) => {
  const res = ctx.player.stats;
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
