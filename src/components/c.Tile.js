import React from "react";
import classNames from "classnames";
import { GameContext } from "../contexts/Game";
import { DungeonTileCSS } from "./c.Dungeon._CSS";
// import { SwordIcon, SkullIcon, MidBossIcon } from "./Icons";
import { KnightIcon } from "./Icons";

const BaseTile = ({
  onClick,
  tile,
  children,
  ...rest
}) => {
  const { game } = React.useContext(GameContext);
  const { player } = game;

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1
  }

  if (player.position && coords.x === player.position[0] && coords.y === player.position[1])
    return (
      <DungeonTileCSS bg={tile.background} current={true}>
        <KnightIcon />
      </DungeonTileCSS>
    );

  return (
    <DungeonTileCSS
      bg={tile.background}
      discovered={tile.discovered}
      available={tile.available}
      completed={tile.completed}
      isVoid={tile.type === "void"}
      onClick={() => onClick()}
      {...rest}
    >
      <div className={classNames("flip-card", { discovered: tile.discovered }, { available: tile.available })}>
        <div className="flip-card-inner">
          <div className="flip-card-front" />
          <div className="flip-card-back">{children}</div>
        </div>
      </div>
    </DungeonTileCSS>
  );
};

export default BaseTile;
