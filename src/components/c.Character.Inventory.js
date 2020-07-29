import React from "react";
// import { CharacterInventoryCSS } from "./c.Character.Inventory._CSS";
import { GameContext } from "../contexts/Game";

const CharacterInventory = ({data}) => {
  const { game, consume } = React.useContext(GameContext);
  const { inventory } = game.player;

  return (
    // <CharacterInventoryCSS>
      <div>
        INV:{" "}
        {inventory.map((el) => (
          <span key={el.id} onClick={() => consume(el.id)}>
            {el.name}
          </span>
        ))}
      </div>
    // </CharacterInventoryCSS>
  );
};

export default CharacterInventory;
