import React from "react";
import classNames from "classnames";
import { Pixelify } from "react-pixelify";

import { GameContext } from "../contexts/Game";
import { DungeonTileCSS } from "./c.Dungeon.Tile._CSS";

import heartIMG from "../assets/stat_heart.png";
import shieldIMG from "../assets/stat_shield.png";
import swordIMG from "../assets/stat_sword.png";
// import coinIMG from "../assets/stat_coin.png";

const BaseTile = ({ onClick, tile, children, ...rest }) => {
  const [itemMode, setItemMode] = React.useState({});
  const [isTarget, setIsTarget] = React.useState(false);
  const { game } = React.useContext(GameContext);
  const { player } = game;

  const handleTargets = (target) => {
    switch (target) {
      case "undiscovered":
        if (!tile.discovered) {
          setIsTarget(true)
        }
        break;
      default:
        console.error("pending item with unknown target")
        break;
    }
  }

  const itemModeHandler = React.useCallback(() => {
    const { pendingItem } = game.player;
    if (pendingItem && pendingItem.id) {
      setItemMode(pendingItem);
    } else {
      setItemMode({});
    }
  }, [game.player.pendingItem]);

  React.useEffect(() => {
    console.log("pending item effect");
    itemModeHandler();
  }, [itemModeHandler]);

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1,
  };

  const clickHandler = () => {
    if (itemMode && isTarget) {
      console.log(itemMode)
    } else {
      onClick()
    }
  }

  if (
    player.position &&
    coords.x === player.position[0] &&
    coords.y === player.position[1]
  )
    return (
      <DungeonTileCSS
        discovered={tile.discovered}
        available={tile.available}
        completed={tile.completed}
        current={true}
      >
        <div
          className={classNames(
            "flip-card",
            { discovered: tile.discovered },
            { available: tile.available }
          )}
        >
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

  return (
    <DungeonTileCSS
      bg={tile.background}
      discovered={tile.discovered}
      available={tile.available}
      completed={tile.completed}
      target={isTarget}
      isVoid={tile.type === "void"}
      onClick={() => clickHandler()}
      {...rest}
    >
      <div
        className={classNames(
          "flip-card",
          { discovered: tile.discovered },
          { available: tile.available }
        )}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front" />
          <div className="flip-card-back">{children}</div>
        </div>
      </div>
    </DungeonTileCSS>
  );
};

export default BaseTile;
