import React from "react";
import BaseTile from "./c.Tile";
import { GameContext } from "../contexts/Game";
import { ChestIcon } from "./Icons";

const Chest = ({ data, tile, ...rest }) => {
  const { game, dispatch } = React.useContext(GameContext);

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1
  }

  const handleClick = () => {
    if (!tile.available) return;
    dispatch({
      type: "player-inventory",
      payload: [...game.player.inventory, ...data],
    });
    dispatch({ type: "player-move", payload: coords });
  };

  return (
    <BaseTile onClick={() => handleClick()} tile={tile} data={data} {...rest}>
      {tile.discovered ? <ChestIcon type={tile.type} /> : ""}
      {JSON.stringify(data)}
    </BaseTile>
  );
};

export default Chest;
