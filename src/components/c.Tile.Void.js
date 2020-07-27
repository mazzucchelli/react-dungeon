import React from "react";

import BaseTile from "./c.Tile";

const Void = ({
  x,
  y,
  ...rest
}) => {
  return (
    <BaseTile
      onClick={() => {}}
      {...rest}
    >
      <span className="coords">
        {x} - {y}
      </span>
    </BaseTile>
  );
};

export default Void;
