import React from "react";
// import { GameContext } from "../contexts/Game";
import Chest from "./c.Tile.Chest";
import Enemy from "./c.Tile.Enemy";
import Potion from "./c.Tile.Potion";
import Pill from "./c.Tile.Pill";
import Shop from "./c.Tile.Shop";
import Void from "./c.Tile.Void";

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
    default:
      // return <>{JSON.stringify({ type, ...rest })}</>;
      return <></>;
  }
};

const DungeonCard = ({ tile, x, y, ...rest }) => {
  return (
    <DynamicCard
      tile={tile}
      data={tile.data}
      {...rest}
    />
  );
};

export default DungeonCard
