import React, { useContext, useEffect } from "react";
import { allCharacters } from "../mocks/characters";

import { GameContext, createDungeoun } from "../contexts/Game";

export default function Lobby() {
  const { game, dispatch } = useContext(GameContext);

  useEffect(() => {
    const dungeon = createDungeoun(game.config.currentLevel);
    dispatch({
      type: "update-dungeon",
      payload: dungeon,
    });
  }, [])

  const selectPG = (index) => {
    const selected = allCharacters[index];
    dispatch({ type: "select-player", payload: selected });
  };

  const startGame = () => {
    dispatch({ type: "game-start" });
  }

  return (
    <>
      {allCharacters.map((pg, i) => (
        <div key={i} onClick={() => selectPG(i)}>
          {pg.name}
        </div>
      ))}
      <button disabled={!game.config.selectedCharacter} onClick={() => startGame()}>start</button>
    </>
  );
}
