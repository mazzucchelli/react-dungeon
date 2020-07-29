import React from "react";

import { GameContext } from "../contexts/Game";
import Character from "./c.Character.Tile"
import Chest from "./c.Tile.Chest";
import Enemy from "./c.Tile.Enemy";
import Potion from "./c.Tile.Potion";
import Pill from "./c.Tile.Pill";
import Shop from "./c.Tile.Shop";
import Void from "./c.Tile.Void";
import Empty from "./c.Tile.Empty";

const DynamicCard = ({ tile, ...rest }) => {
  switch (tile.type) {
    case "fight":
      return <Enemy tile={tile} {...rest} />;
    case "chest":
      return <Chest tile={tile} {...rest} />;
    case "pill":
      return <Pill tile={tile} {...rest} />;
    case "midboss":
      return <Enemy tile={tile} {...rest} />;
    case "boss":
      return <Enemy tile={tile} {...rest} />;
    case "shop":
      return <Shop tile={tile} {...rest} />;
    case "potion":
      return <Potion tile={tile} {...rest} />;
    case "void":
      return <Void tile={tile} {...rest} />;
    case "empty":
      return <Empty tile={tile} {...rest} />;
    default:
      console.error("nothing generated for", { tile, ...rest });
      return <></>;
  }
};

const DungeonCard = ({ tile, x, y, ...rest }) => {
  const { game } = React.useContext(GameContext);
  const { player } = game;

  // if player position show character tile
  if (player.position && x === player.position[0] && y === player.position[1])
    return <Character />;

  // else handle tile data
  return <DynamicCard tile={tile} data={tile.data} {...rest} />;
};

export default DungeonCard;
