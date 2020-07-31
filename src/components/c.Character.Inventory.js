import React from "react";
import { InventoryCSS, InventoryItemCSS } from "./c.Character.Inventory._CSS";
import { Gif } from "./c.UI";
import { GameContext } from "../contexts/Game";

const CharacterInventory = ({ data, readOnly }) => {
  const { consume } = React.useContext(GameContext);

  const handleClick = (id) => {
    if (readOnly) return;
    consume(id);
  };

  return (
    <InventoryCSS>
      <span className="title">Inventory:</span>
      {data.map((el) => (
        <InventoryItemCSS key={el.id} onClick={() => handleClick(el.id)}>
          <Gif
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
