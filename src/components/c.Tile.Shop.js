import React from "react";
import { GameContext } from "../contexts/Game";
import BaseTile from "./c.Tile";
import { ShopIcon } from "./Icons";

const Shop = ({
  tile,
  ...rest
}) => {
  const { dispatch } = React.useContext(GameContext);
  const { available, discovered } = tile;

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1
  }

  const handleClick = () => {
    if (!available) return;
    dispatch({ type: "player-move", payload: coords });
  };

  return (
    <BaseTile
      tile={tile}
      onClick={() => handleClick()}
      {...rest}
    >
      {discovered ? <ShopIcon /> : ""}
    </BaseTile>
  );
};

export default Shop;
