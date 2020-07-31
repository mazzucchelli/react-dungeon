import React from "react";
import {
  CharacterPanelCSS,
  CharacterStatsCSS,
  CharacterInfoCSS,
} from "./c.Character.Panel._CSS";
import { GameContext } from "../contexts/Game";
import Inventory from "./c.Character.Inventory";
import { Pixelify } from "react-pixelify";

import heartIMG from "../assets/stat_heart.png";
import shieldIMG from "../assets/stat_shield.png";
import swordIMG from "../assets/stat_sword.png";
import coinIMG from "../assets/stat_coin.png";

const CharacterPanel = ({ character, showFloor, readOnly }) => {
  const { game } = React.useContext(GameContext);
  const pg = character || game.player;

  return (
    <CharacterPanelCSS>
      <CharacterInfoCSS>
        <div>
          <Pixelify src={pg.avatar} pixelSize={2} />
        </div>
        <div>
          <span className="character-name">{pg.name}</span>
          {showFloor && (
            <span className="current-floor">
              <br />
              Floor: {game.config.currentFloor}
            </span>
          )}
        </div>
      </CharacterInfoCSS>
      <CharacterStatsCSS>
        <div>
          <img width="20" src={heartIMG} alt="HP icon" />
          <span className="value">
            {pg.stats.HP}/{pg.stats.maxHP}
          </span>
        </div>
        <div>
          <img width="20" src={swordIMG} alt="Damage icon" />
          <span className="value">{pg.stats.att}</span>
        </div>
        <div>
          <img width="20" src={shieldIMG} alt="Shield icon" />
          <span className="value">{pg.stats.shield}</span>
        </div>
        <div>
          <img width="20" src={coinIMG} alt="Coins icon" />
          <span className="value">{pg.coins}</span>
        </div>
      </CharacterStatsCSS>
      <Inventory data={pg.inventory} readOnly={readOnly} />
    </CharacterPanelCSS>
  );
};

export default CharacterPanel;
