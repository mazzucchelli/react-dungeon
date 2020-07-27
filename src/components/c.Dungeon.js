import React from "react";
import levels from "../mocks/levels.json";

import { GameContext } from "../contexts/Game";
import {
  DungeonGridCSS,
  DungeonRowCSS,
  OverflowHidden,
} from "./c.Dungeon._CSS";
import DungeonTile from "./c.Dungeon.Tile";

const DungeonRow = ({ row, ...rest }) => {
  return (
    <DungeonRowCSS>
      {row.map((tile, j) => (
        <DungeonTile key={j} tile={tile} y={j} {...rest} />
      ))}
    </DungeonRowCSS>
  );
};

const DungeonGrid = () => {
  const { game, gridRef } = React.useContext(GameContext);
  const { config, dungeon } = game;
  const level = levels[config.currentLevel];

  React.useEffect(() => {
    if (!gridRef) return
    setTimeout(() => gridRef.current.scrollTo(0, gridRef.current.scrollHeight), 1);
  }, [])

  return (
    <DungeonGridCSS size={level.size}>
      {dungeon.length &&
        dungeon.map((row, i) => <DungeonRow key={i} row={row} x={i} />)}
    </DungeonGridCSS>
  );
};

export default function Dungeon() {
  const { gridRef, scrollBottom } = React.useContext(GameContext);

  return (
    <OverflowHidden ref={gridRef}>
      <DungeonGrid />
    </OverflowHidden>
  );
}
