import React from "react";
import BaseTile from "./c.Tile";
import { GameContext } from "../contexts/Game";

const Empty = ({ tile, ...rest }) => {
  const { characterMove } = React.useContext(GameContext);

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1,
  };

  const handleClick = () => {
    if (!tile.available) return;
    characterMove(coords);
  };

  return (
    <BaseTile onClick={() => handleClick()} tile={tile} {...rest} />
  );
};

export default Empty;
