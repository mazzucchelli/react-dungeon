import styled from "styled-components";

export const OverflowHidden = styled('div')`
  height: calc(100vh - 50px);
  position: relative;
  width: 100%;
  /* max-width: 600px; */
  margin: 0 auto;
  overflow: hidden;
`

export const DungeonGridCSS = styled("div")`
  padding: 6px;
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column-reverse;
  grid-gap: 6px;
  grid-template-rows: ${({ size }) => `repeat(${size.rows}, 1fr)`};
  grid-template-columns: ${({ size }) => `repeat(${size.cols}, 1fr)`};
`;

export const DungeonRowCSS = styled("div")`
  display: flex;
`

export const DungeonTileCSS = styled("div")`
  width: 20%;
  height: calc(100vh / 6);
  padding: 3px;
  color: white;
  font-size: 18px;
  border-radius: 6px;
  overflow: hidden;
  user-select: none;
  position: relative;
  cursor: ${({ available, isVoid }) => (available && !isVoid ? "pointer" : "")};
  box-shadow: ${({ available, isVoid }) =>
    available && !isVoid ? "0 0 0 rgba(204,169,44, 0.4);" : ""};
  animation: ${({ available, isVoid }) =>
    available && !isVoid ? "pulse 1s infinite" : ""};
  /* opacity: ${({ discovered, available }) =>
    discovered && !available ? ".4" : "1"}; */
    opacity: ${({ isVoid, discovered, available }) => {
      if (isVoid) {
        return "0";
      } else {
        return discovered && !available ? ".4;" : "1;";
      }
    }};

  ${({ completed }) =>
    completed
      ? `
        .flip-card-inner {
          transform: scale(.7);
          overflow: hidden;

          .flip-card-front > * ,
          .flip-card-back > * {
            opacity: 0;
          }
        }
      `
      : ""}

  .coords {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 12px;
  }

  .HP {
    /* position: absolute;
    top: 5px;
    right: 5px; */
    font-size: 12px;
    display: block;
  }

  .att {
    /* position: absolute;
    bottom: 5px;
    left: 5px; */
    font-size: 12px;
    display: block;
  }

  .shield {
    /* position: absolute;
    bottom: 5px;
    right: 5px; */
    font-size: 12px;
    display: block;
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
    background: gray;
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
    justify-content: center;
    align-items: center;
  }

  .flip-card-back {
    background: ${({ discovered, bg, current }) =>
      discovered || current ? bg : "gray"};
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    70% {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`;
