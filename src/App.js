import React from "react";
import "./styles.css";

import { GameProvider } from "./contexts/Game";
import Dungeon from "./components/c.Dungeon";
import PGPanel from "./components/PGPanel";

export default function App() {
  return (
    <GameProvider>
      <Dungeon />
      <PGPanel />
      {/* <button
          onClick={() =>
            setPlayerPosition([playerPosition[0] - 1, playerPosition[1]])
          }
        >
          Move up
        </button>
        <button
          onClick={() =>
            setPlayerPosition([playerPosition[0], playerPosition[1] + 1])
          }
        >
          Move right
        </button>
        <button
          onClick={() =>
            setPlayerPosition([playerPosition[0] + 1, playerPosition[1]])
          }
        >
          Move down
        </button>
        <button
          onClick={() =>
            setPlayerPosition([playerPosition[0], playerPosition[1] - 1])
          }
        >
          Move left
        </button>
        <pre>{JSON.stringify(adiacents, null, 4)}</pre>
        <pre>{JSON.stringify(grid, null, 4)}</pre> */}
    </GameProvider>
  );
}
