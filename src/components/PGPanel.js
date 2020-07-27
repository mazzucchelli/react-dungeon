import React from "react";
import { PGPanelCSS } from "./PGPanel._CSS";
import { GameContext } from "../contexts/Game";
// import Inventory from "./inventory";

import { GIF } from "./c.GIF";
import AirA from '../assets/mobs/AirA.png'
import WormF from '../assets/mobs/WormF.png'
import TentacleA from '../assets/mobs/TentacleA.png'
import SquirrelB from '../assets/mobs/SquirrelB.png'

const PGPanel = () => {
  const { game, consume } = React.useContext(GameContext);

  return (
    <PGPanelCSS>
      <GIF name="AirA" image={AirA} size={32} frames={5} />
      <GIF name="WormF" image={WormF} size={32} frames={6} />
      <GIF name="TentacleA" image={TentacleA} size={32} frames={6} />
      <GIF name="SquirrelB" image={SquirrelB} size={32} frames={7} />
      <div>
        HP: {game.player.stats.HP}/{game.player.stats.maxHP}
      </div>
      <div>att: {game.player.stats.att}</div>
      <div>def: {game.player.stats.shield}</div>
      <div>Coins: {game.player.coins}</div>
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
