import React, { useState } from "react";
import Modal from "styled-react-modal";

import { GameContext } from "../contexts/Game";
import BaseTile from "./c.Tile";
import { ShopIcon } from "./Icons";
import { GifFrame } from "./c.UI";

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Shop = ({ tile, data, ...rest }) => {
  const { characterMove } = React.useContext(GameContext);
  const { available, discovered } = tile;
  const [isOpen, setIsOpen] = useState(false);

  const coords = {
    x: tile.coords.split("-")[0].trim() * 1,
    y: tile.coords.split("-")[1].trim() * 1,
  };

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    characterMove(coords);
  };

  const handleClick = () => {
    if (!available) return;
    setIsOpen(true);
  };

  return (
    <BaseTile tile={tile} onClick={() => handleClick()} {...rest}>
      {discovered ? (
        <>
          <ShopIcon />
          <StyledModal
            isOpen={isOpen}
            onBackgroundClick={() => {}}
            onEscapeKeydown={() => {}}
          >
            <span>I am a modal!</span>
            <button onClick={(e) => toggleModal(e)}>Close me</button>
            {data && data.map((el) => (
              <div key={el.id}>
                <GifFrame
                  name={el.name}
                  image={`assets/items/${el.image}.png`}
                  size={22}
                />
                {el.name} - {el.price}
              </div>
            ))}
          </StyledModal>
        </>
      ) : (
        ""
      )}
    </BaseTile>
  );
};

export default Shop;
