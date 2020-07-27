import React from "react";
import classNames from "classnames";
import { GameContext } from "../contexts/Game";
import BaseTile from "./c.Tile";
import { GIF } from "./c.GIF";
// import { SwordIcon, SkullIcon, MidBossIcon } from "./Icons";

// const DungeonIcon = ({ type }) => {
//   if (type === "fight") return <SwordIcon />;
//   if (type === "midboss") return <MidBossIcon />;
//   if (type === "boss") return <SkullIcon />;
//   return <></>;
// };

const Enemy = ({ data, tile, ...rest }) => {
  const { game, dispatch, handleFight } = React.useContext(GameContext);
  const { available, discovered, type } = tile;
  const { stats, rewards } = data;

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1,
  };

  const fight = () => {
    if (!available) return;

    const fightData = handleFight(data, coords.x);
    dispatch({ type: "fight", payload: fightData });

    // if (stats.HP <= 0) {
    //   movePlayer({ x, y });
    // }
  };

  const getRewards = () => {
    if (!available) return;

    const updatedCoins = game.player.coins + rewards.coins;
    dispatch({ type: "player-coins", payload: updatedCoins });
    dispatch({ type: "player-move", payload: coords });
  };

  return (
    <BaseTile
      className={classNames({ available: available })}
      onClick={stats.HP > 0 ? fight : getRewards}
      data={data}
      tile={tile}
      {...rest}
    >
      {discovered && (
        <>
          {stats.HP > 0 ? (
            <>
              <GIF name={data.sprite} image={`assets/mobs/${data.sprite}.png`} size={38} frames={data.frames} />
              <span className="HP">HP:{stats.HP}</span>
              <span className="att">Att:{stats.att}</span>
              <span className="shield">Def:{stats.shield}</span>
            </>
          ) : (
            <div className="rewards">
              {/* {JSON.stringify(data)} */}
              <span className="coins">COINS:{rewards.coins}</span>
            </div>
          )}
        </>
      )}
    </BaseTile>
  );
};

export default Enemy;
