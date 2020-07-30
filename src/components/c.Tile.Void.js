import React from "react";

import BaseTile from "./c.Tile";
import { Gif } from "./c.UI";

const Void = ({ x, y, ...rest }) => {
  return (
    <BaseTile onClick={() => {}} {...rest}>
      <span className="coords">
        <Gif
          name="SparksA"
          image={`assets/mobs/SparksA.png`}
          size={38}
        />
      </span>
    </BaseTile>
  );
};

export default Void;
