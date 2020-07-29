import React from "react";
import { LogsCSS } from "./c.Logs._CSS";
import { GameContext } from "../contexts/Game";

const Logs = ({ data }) => {
  const { logs } = React.useContext(GameContext);

  return (
    <LogsCSS>
      {logs.map((el, i) => (
        <li key={i}>{el}</li>
      ))}
    </LogsCSS>
  );
};

export default Logs;
