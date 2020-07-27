import styled from "styled-components";

export const IconCSS = styled("div")`
  width: ${({ size }) => (size ? `${size}px` : "35px")};
  height: ${({ size }) => (size ? `${size}px` : "35px")};

  svg {
    display: block;
  }
`;
