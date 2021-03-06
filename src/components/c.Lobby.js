import React, { useContext } from "react";
import { allCharacters } from "../mocks/characters";
import { createDungeoun } from "../helpers/mapHelpers";
import { GameContext } from "../contexts/Game";
import CharacterPanel from "./c.Character.Panel";
import { CharactersGrid, StartGameButton } from "./c.Lobby._CSS";

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
      <CharactersGrid>
        {allCharacters.map((pg, i) => (
          <div
            key={i}
            onClick={() => selectPG(i)}
            style={{
              background:
                game.player.name === pg.name ? "tomato" : "transparent",
            }}
          >
            <CharacterPanel character={pg} readOnly={true} />
          </div>
        ))}
      </CharactersGrid>
      <div style={{ textAlign: "center", marginTop: "30px", maxWidth: "600px", margin: "0 auto" }}>
        <StartGameButton
          disabled={!game.config.selectedCharacter}
          onClick={() => startGame()}
        >
          start
        </StartGameButton>
      </div>
    </>
  );
}
