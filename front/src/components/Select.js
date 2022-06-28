import styled from 'styled-components';

export default styled.select`
  width: 100%;
  background: #fff;
  border: none;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  outline: none;
  font-size: 16px;
  border: 2px solid #fff;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
