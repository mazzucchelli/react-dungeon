import styled from "styled-components";

const CARD_BACK = "#525252";
const CARD_SHADOW = "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)";

export const DungeonTileCSS = styled("div")`
  border-right: 1px dotted rgba(255, 255, 255, 0.3);
  width: 20%;
  height: calc(100vh / 6);
  padding: 10px;
  color: white;
  overflow: hidden;
  user-select: none;
  position: relative;
  cursor: ${({ available, isVoid }) => (available && !isVoid ? "pointer" : "")};
  box-shadow: ${({ available, isVoid }) =>
    available && !isVoid ? "0 0 0 rgba(255, 255, 255, 0.4);" : ""};
  animation: ${({ available, isVoid }) =>
    available && !isVoid ? "pulse 1s infinite" : ""};

  ${({ completed, isVoid, current}) =>
    (completed || isVoid) && !current
      ? `
        .flip-card-inner {
          display: none;
        }
      `
      : ""}

  .coords {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 12px;
  }

  .name {
    font-size: 12px;
    /* text-transform: uppercase; */
  }

  .stats-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  .HP {
    /* position: absolute;
    top: 5px;
    right: 5px; */
    font-size: 12px;
    display: block;
    /* display: flex;
    align-items: center; */
  }

  .att {
    /* position: absolute;
    bottom: 5px;
    left: 5px; */
    font-size: 12px;
    display: block;
    /* display: flex;
    align-items: center; */
  }

  .shield {
    /* position: absolute;
    bottom: 5px;
    right: 5px; */
    font-size: 12px;
    display: block;
    /* display: flex;
    align-items: center; */
  }

  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 100%;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.4s ease;
    transform-style: preserve-3d;
    background: ${CARD_BACK};
    box-shadow: ${CARD_SHADOW};
  }

  .flip-card:not(.discovered) .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;
  }

  .flip-card-back {
    background: ${({ discovered, bg }) => (discovered ? bg : CARD_BACK)};
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.8);
    }
    50% {
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
    }
    75% {
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }
`;
