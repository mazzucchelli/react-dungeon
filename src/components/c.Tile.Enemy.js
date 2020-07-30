import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import { GameContext } from "../contexts/Game";
import BaseTile from "./c.Tile";
import { Gif } from "./c.UI";
import spriteData from "../mocks/spriteData.json";
import { rollPure } from "../helpers/utilities";
import heartIMG from "../assets/stat_heart.png";
import shieldIMG from "../assets/stat_shield.png";
import swordIMG from "../assets/stat_sword.png";
import coinIMG from "../assets/stat_coin.png";

const Enemy = ({ data, tile, ...rest }) => {
  const { game, dispatcher, handleFight, characterMove } = useContext(
    GameContext
  );
  const { available, discovered } = tile;
  const { stats, rewards } = data;
  const { frames } = spriteData[data.sprite];
  const [coinsReward, setCoinReward] = useState(0);

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1,
  };

  const fight = () => {
    if (!available) return;

    const fightData = handleFight(data, coords.x);
    dispatcher(
      {
        type: "fight",
        payload: fightData,
      },
      "fight",
      fightData
    );
  };

  const getRewards = () => {
    if (!available) return;

    const updatedCoins = game.player.coins + coinsReward;
    dispatcher(
      {
        type: "player-coins",
        payload: updatedCoins,
      },
      ".. get reward ..",
      "add coins",
      coinsReward,
      "total",
      updatedCoins
    );
    characterMove(coords);
  };

  const calcolateCoinReward = React.useCallback(() => {
    const p = 0; // TODO handles passives
    const min = stats.shield > 0 ? stats.shield : 1;
    const max = stats.shield + stats.att + p;
    return rollPure(min, max);
  }, [stats]);

  useEffect(() => {
    if (rewards.coins) {
      const coins = calcolateCoinReward();
      setCoinReward(coins);
    }
  }, [calcolateCoinReward, rewards.coins]);

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
              <span className="name">{data.name}</span>
              <Gif
                name={data.sprite}
                image={`assets/mobs/${data.sprite}.png`}
                size={38}
                frames={frames}
              />
              <div className="stats-container">
                <span className="HP">
                  <div>
                    <img width="20" src={heartIMG} alt="HP icon" />
                  </div>
                  {stats.HP}
                </span>
                {stats.shield > 0 && (
                  <span className="shield">
                    <>
                      <div>
                        <img width="20" src={shieldIMG} alt="HP icon" />
                      </div>
                      {stats.shield}
                    </>
                  </span>
                )}
                <span className="att">
                  <div>
                    <img width="20" src={swordIMG} alt="HP icon" />
                  </div>
                  {stats.att}
                </span>
              </div>
            </>
          ) : (
            <>
              <div></div>
              <div className="rewards">
                <span className="coins">
                  <img width="20" src={coinIMG} alt="HP icon" /> {coinsReward}
                </span>
              </div>
              <div></div>
            </>
          )}
        </>
      )}
    </BaseTile>
  );
};

export default Enemy;
