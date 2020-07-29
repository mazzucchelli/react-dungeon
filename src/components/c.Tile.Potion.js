import React from "react";
import { GameContext } from "../contexts/Game";
import BaseTile from "./c.Tile";
import { GIF } from "./c.GIF";
import spriteData from "../mocks/spriteData.json";

const Potion = ({ data, tile, ...rest }) => {
  const { handleAction, dispatch } = React.useContext(GameContext);
  const { available, discovered } = tile;
  const [effects, setEffects] = React.useState([]);
  const { frames } = spriteData[data.sprite];

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1,
  };

  const actionsList = React.useCallback(() => {
    const res = [];
    for (const [key, value] of Object.entries(data.actions[0].payload)) {
      res.push({
        label: key,
        value,
      });
    }
    return res;
  }, [data.actions]);

  React.useEffect(() => {
    const list = actionsList();
    setEffects(list);
  }, [actionsList]);

  const handleClick = () => {
    if (!available) return;

    data.actions.forEach((action) => {
      handleAction(action);
    });
    dispatch({ type: "player-move", payload: coords });
  };

  return (
    <BaseTile data={data} tile={tile} {...rest} onClick={() => handleClick()}>
      {discovered ? (
        <>
          <GIF
            name={data.sprite}
            image={`assets/potions/${data.sprite}.png`}
            size={38}
            frames={frames}
          />
          {effects.map((el, i) => (
            <span key={i} className={el.label}>
              {el.label}: {el.value}
            </span>
          ))}
        </>
      ) : (
        ""
      )}
    </BaseTile>
  );
};

export default Potion;
