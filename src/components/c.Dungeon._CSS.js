import styled from "styled-components";

export const OverflowHidden = styled("div")`
  height: calc(100vh);
  position: relative;
  width: 100%;
  /* max-width: 600px; */
  margin: 0 auto;
  overflow: hidden;
`;

export const DungeonGridCSS = styled("div")`
  padding-bottom: 20px;
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column-reverse;
  border: 1px dotted rgba(255, 255, 255, .3);
`;

export const DungeonRowCSS = styled("div")`
  display: flex;
  border-top: 1px dotted rgba(255, 255, 255, .3);
`;
