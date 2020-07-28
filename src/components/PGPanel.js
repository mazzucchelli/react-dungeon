import React from "react";
import { PGPanelCSS } from "./PGPanel._CSS";
import { GameContext } from "../contexts/Game";
// import Inventory from "./inventory";

import heartIMG from "../assets/stat_heart.png";
import shieldIMG from "../assets/stat_shield.png";
import swordIMG from "../assets/stat_sword.png";
import coinIMG from "../assets/stat_coin.png";

// import { GIF } from "./c.GIF";

const PGPanel = () => {
  const { game, consume } = React.useContext(GameContext);

  return (
    <PGPanelCSS>
      <div>
        <img width="20" src={heartIMG} alt="HP icon" /> {game.player.stats.HP}/
        {game.player.stats.maxHP}
      </div>
      <div>
        <img width="20" src={swordIMG} alt="HP icon" />
        {game.player.stats.att}
      </div>
      <div>
        <img width="20" src={shieldIMG} alt="HP icon" />
        {game.player.stats.shield}
      </div>
      <div>
        <img width="20" src={coinIMG} alt="HP icon" />
        {game.player.coins}
      </div>
      <div>Floor: {game.config.currentFloor}</div>
      <div>
        INV:{" "}
        {game.player.inventory.map((el) => (
          <span key={el.id} onClick={() => consume(el.id)}>
            {el.name}
          </span>
        ))}
      </div>
    </PGPanelCSS>
  );
};

export default PGPanel;
