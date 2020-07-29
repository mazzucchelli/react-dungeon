import React from "react";
import { Grid, Cell } from "styled-css-grid";
import "./styles.css";

import { GameContext, GameProvider } from "./contexts/Game";
import Dungeon from "./components/c.Dungeon";
import PGPanel from "./components/PGPanel";
import Lobby from "./components/c.Lobby";

const View = () => {
  const { game } = React.useContext(GameContext);

  return game.config.started ? (
    <>
      <Grid columns={"1fr 300px"} areas={["main side"]} gap="2px">
        <Cell area="main">
          <Dungeon />
        </Cell>
        <Cell area="side">
          <PGPanel />
        </Cell>
      </Grid>
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
