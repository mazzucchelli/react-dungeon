import React, { useContext } from "react";
import { allCharacters } from "../mocks/characters";
import { createDungeoun } from "../helpers/mapHelpers";
import { GameContext } from "../contexts/Game";

export default function Lobby() {
  const { game, dispatcher } = useContext(GameContext);

  const selectPG = (index) => {
    const selected = allCharacters[index];
    dispatcher(
      {
        type: "select-player",
        payload: selected,
      },
      `selected characther ${selected.name}`
    );
  };

  const startGame = () => {
    const createdDungeoun = createDungeoun(game.config.currentLevel);

    dispatcher(
      {
        type: "update-dungeon",
        payload: createdDungeoun,
      },
      "update-dungeon"
    );
    dispatcher({ type: "game-start" }, `game started`);
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
