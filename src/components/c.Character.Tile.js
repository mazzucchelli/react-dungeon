import React from "react";
import classNames from "classnames";
import { Pixelify } from "react-pixelify";

import { GameContext } from "../contexts/Game";
import { DungeonTileCSS } from "./c.Dungeon.Tile._CSS";

import heartIMG from "../assets/stat_heart.png";
import shieldIMG from "../assets/stat_shield.png";
import swordIMG from "../assets/stat_sword.png";

const CharacterTile = () => {
  const { game } = React.useContext(GameContext);
  const { player } = game;

  return (
    <DungeonTileCSS
      discovered={true}
      available={false}
      completed={true}
      current={true}
    >
      <div className={classNames("flip-card", { discovered: true })}>
        <div className="flip-card-inner">
          <div className="flip-card-back">
            <span className="name">{player.name}</span>
            <Pixelify src={player.avatar} pixelSize={2} />
            <div className="stats-container">
              <span className="HP">
                <div>
                  <img width="20" src={heartIMG} alt="HP icon" />
                </div>
                {player.stats.HP}
              </span>
              {player.stats.shield > 0 && (
                <span className="shield">
                  <>
                    <div>
                      <img width="20" src={shieldIMG} alt="HP icon" />
                    </div>
                    {player.stats.shield}
                  </>
                </span>
              )}
              <span className="att">
                <div>
                  <img width="20" src={swordIMG} alt="HP icon" />
                </div>
                {player.stats.att}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DungeonTileCSS>
  );
};

export default CharacterTile;
