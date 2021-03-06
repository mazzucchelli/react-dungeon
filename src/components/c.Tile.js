import React, { useContext } from "react";
import classNames from "classnames";

import { GameContext } from "../contexts/Game";
import { DungeonTileCSS, TargetIndicatorsCSS } from "./c.Dungeon.Tile._CSS";

const TargetTileBG = ({ active }) => (
  <TargetIndicatorsCSS active={active}>
    <div className="top-left"></div>
    <div className="top-right"></div>
    <div className="bottom-left"></div>
    <div className="bottom-right"></div>
  </TargetIndicatorsCSS>
);

const BaseTile = ({ onClick, tile, children, ...rest }) => {
  // const [itemMode, setItemMode] = React.useState({});
  const { game, dispatcher } = useContext(GameContext);
  const { itemMode } = game.config;

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1,
  };

  const clickHandler = () => {
    if (itemMode) {
      // console.log(game.player, game.player.pendingAction);
      dispatcher(
        {
          type: game.player.pendingAction.event,
          payload: game.player.pendingAction.getPayload(game, coords),
        },
        game.player.pendingAction.event,
        game.player.pendingAction.getPayload(game, coords)
      );
      dispatcher(
        {
          type: "item-mode",
          payload: {
            isItemMode: false,
          },
        },
        "exit item mode"
      );
    } else {
      onClick();
    }
  };

  return (
    <>
      <DungeonTileCSS
        bg={tile.background}
        discovered={tile.discovered}
        available={itemMode ? tile.target : tile.available}
        completed={tile.completed}
        // type={tile.type}
        isVoid={tile.type === "void"}
        onClick={() => clickHandler()}
        {...rest}
      >
        <TargetTileBG active={itemMode ? tile.target : tile.available} />
        <div
          className={classNames("flip-card", { discovered: tile.discovered })}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front" />
            <div className="flip-card-back">{children}</div>
          </div>
        </div>
      </DungeonTileCSS>
    </>
  );
};

export default BaseTile;
