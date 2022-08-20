import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 2.5rem;
    height: 2.5rem;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: grid;
      place-items: center;

      color: ${(props) => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      transition: border-color 0.1s;

      &.active {
        color: ${(props) => props.theme['green-500']};
      }

      &:hover {
        border-bottom-color: ${(props) => props.theme['green-500']};
      }
    }
  }
`;
