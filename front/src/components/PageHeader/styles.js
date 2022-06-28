import styled from 'styled-components';

export const Container = styled.header`
  margin-bottom: 24px;

  a {
    display: flex;
    align-items: center;

    text-decoration: none;
    margin-bottom: 8px;

    img {
      transform: rotate(-90deg);
    }

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
      margin-left: 8px;
    }
  }

  h1 {
    font-size: 24px;
  }
`;
