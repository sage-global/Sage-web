import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid rgb(var(--lineColor, 234, 231, 228));
  background: rgb(var(--inputBackground));
  border-radius: 0.8rem;
  font-size: 1.5rem;
  font-family: var(--font-body);
  padding: 1.4rem 1.8rem;
  height: 4.8rem;
  color: rgb(var(--text));
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: rgb(var(--primary));
    box-shadow: 0 0 0 3px rgba(var(--primary), 0.15);
  }
`;

export default Input;
