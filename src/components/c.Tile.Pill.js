import React from "react";
import { GameContext } from "../contexts/Game";
import BaseTile from "./c.Tile";

import EggA0 from "../assets/items/EggA0.png";
import EggA1 from "../assets/items/EggA1.png";
import EggA2 from "../assets/items/EggA2.png";
import EggA3 from "../assets/items/EggA3.png";
import { rollPure } from "../helpers/utilities";

const Pill = ({ data, tile, ...rest }) => {
  const { handleAction, characterMove } = React.useContext(GameContext);
  const { available, discovered } = tile;

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1,
  };

  const pills = [EggA0, EggA1, EggA2, EggA3];
  const PillIMG = pills[rollPure(0, 3)];

  const handleClick = () => {
    if (!available) return;
    data.actions.forEach((action) => {
      handleAction(action);
    });

    characterMove(coords);
  };

  return (
    <BaseTile data={data} tile={tile} onClick={() => handleClick()} {...rest}>
      {discovered ? (
        <>
          <div></div>
          <img width="48" src={PillIMG} alt="HP icon" />
          <div></div>
        </>
      ) : (
        ""
      )}
    </BaseTile>
  );
};

export default Pill;
