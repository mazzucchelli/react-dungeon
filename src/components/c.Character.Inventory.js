import React from "react";
import { InventoryCSS, InventoryItemCSS } from "./c.Character.Inventory._CSS";
import { GIF } from "./c.GIF";
import { GameContext } from "../contexts/Game";

const CharacterInventory = ({ data }) => {
  const { game, consume } = React.useContext(GameContext);
  const { inventory } = game.player;

  return (
    <InventoryCSS>
      INV:{" "}
      {inventory.map((el) => (
        <InventoryItemCSS key={el.id} onClick={() => consume(el.id)}>
          <GIF
            name={el.name}
            image={`assets/items/${el.image}.png`}
            size={22}
          />
          {el.name}
        </InventoryItemCSS>
      ))}
    </InventoryCSS>
  );
};

export default CharacterInventory;
