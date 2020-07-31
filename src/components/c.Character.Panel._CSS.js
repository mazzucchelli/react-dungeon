import styled from "styled-components";

export const CharacterPanelCSS = styled("div")`
  padding: 15px;
  color: white;
  /* position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: white;

  > div {
    margin-right: 10px;
  } */
`;

export const CharacterInfoCSS = styled("div")`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 64px 1fr;

  .character-name {
    display: block;
    text-transform: uppercase;
  }

  .current-floor {
    display: block;
    margin-top: 5px;
    font-size: 13px;
  }
`

export const CharacterStatsCSS = styled("div")`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  margin: 15px 0;

  > div {
    border: 1px dashed rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    padding: 5px;
  }

  .value {
    margin-left: 5px;
  }
`;
