import React from "react";

import BaseTile from "./c.Tile";
import { Gif } from "./c.UI";

const Void = ({ x, y, ...rest }) => {
  return (
    <BaseTile onClick={() => {}} {...rest}>
      <span></span>
      {/* <Gif
        name="SparksA"
        image={`assets/mobs/SparksA.png`}
        size={38}
        frames={7}
      /> */}
      <span></span>
    </BaseTile>
  );
};

export default Void;
