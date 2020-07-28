import React from "react";
import "./styles.css";

import { GameContext, GameProvider } from "./contexts/Game";
import Dungeon from "./components/c.Dungeon";
import PGPanel from "./components/PGPanel";
import Lobby from "./components/c.Lobby"

const View = () => {
  const { game } = React.useContext(GameContext);

  return game.config.started ? (
    <>
      <Dungeon />
      <PGPanel />
    </>
  ) : (
    <Lobby />
  );
};

export default function App() {
  return (
    <GameProvider>
      <View />
    </GameProvider>
  );
}
