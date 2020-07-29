import React from "react";
import { CharacterPanelCSS } from "./c.Character.Panel._CSS";
import { GameContext } from "../contexts/Game";
import Inventory from "./c.Character.Inventory";
// import Logs from "./c.Logs";

import heartIMG from "../assets/stat_heart.png";
import shieldIMG from "../assets/stat_shield.png";
import swordIMG from "../assets/stat_sword.png";
import coinIMG from "../assets/stat_coin.png";

const CharacterPanel = () => {
  const { game } = React.useContext(GameContext);

  return (
    <CharacterPanelCSS>
      <div>
        <img width="100" src={game.player.avatar} alt="character avatar" />
      </div>
      <div>
        <img width="20" src={heartIMG} alt="HP icon" /> {game.player.stats.HP}/
        {game.player.stats.maxHP}
      </div>
      <div>
        <img width="20" src={swordIMG} alt="Damage icon" />
        {game.player.stats.att}
      </div>
      <div>
        <img width="20" src={shieldIMG} alt="Shield icon" />
        {game.player.stats.shield}
      </div>
      <div>
        <img width="20" src={coinIMG} alt="Coins icon" />
        {game.player.coins}
      </div>
      <div>Floor: {game.config.currentFloor}</div>
      <div>
        <Inventory />
        {/* <Logs /> */}
      </div>
    </CharacterPanelCSS>
  );
};

export default CharacterPanel;
