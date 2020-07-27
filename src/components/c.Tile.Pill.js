import React from "react";
import { GameContext } from "../contexts/Game";
import BaseTile from "./c.Tile";
import { QuestIcon } from "./Icons";

const Pill = ({
  data,
  tile,
  ...rest
}) => {
  const { handleAction, dispatch } = React.useContext(GameContext);
  const { available, discovered } = tile;

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1
  }

  const handleClick = () => {
    if (!available) return;
    data.actions.forEach(action => {
      handleAction(action)
    });

    dispatch({ type: "player-move", payload: coords });
  };

  return (
    <BaseTile
    data={data}
    tile={tile}
      onClick={() => handleClick()}
      {...rest}
    >
      {discovered ? <QuestIcon /> : ""}
    </BaseTile>
  );
};

export default Pill;
