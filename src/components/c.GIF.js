import styled from "styled-components";

export const GIF = styled("div")`
  width: ${({ size }) => `${size || 16}px`};
  height: ${({ size }) => `${size || 16}px`};
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  animation: ${({ name, frames, duration }) =>
    `play-${name} ${duration || 0.8}s steps(${frames}) infinite`};

    ${({ name, frames, size }) => `
        @keyframes play-${name} {
            100% {
                background-position: ${size * frames}px;
            }
        }
    `}
`;
