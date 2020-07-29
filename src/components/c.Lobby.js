import React, { useContext } from "react";
import { allCharacters } from "../mocks/characters";

import { GameContext } from "../contexts/Game";

export default function Lobby() {
  const { game, dispatch } = useContext(GameContext);

  const selectPG = (index) => {
    const selected = allCharacters[index];
    dispatch({
      type: "select-player",
      payload: selected,
      logs: [`selected characther ${selected.name}`, ...game.logs],
    });
  };

  const startGame = () => {
    dispatch({ type: "game-start", logs: [`game started`, ...game.logs] });
  };

  return (
    <>
      {allCharacters.map((pg, i) => (
        <div key={i} onClick={() => selectPG(i)}>
          {pg.name}
        </div>
      ))}
      <button
        disabled={!game.config.selectedCharacter}
        onClick={() => startGame()}
      >
        start
      </button>
    </>
  );
}
