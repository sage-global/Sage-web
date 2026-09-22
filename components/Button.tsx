import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type ButtonProps = PropsWithChildren<{
  transparent?: boolean;
  as?: any;
  type?: any;
  disabled?: boolean;
  href?: string;
  onClick?: (e?: any) => void;
}>;

const Button = styled.button<ButtonProps>`
  border: none;
  background: none;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  background: ${(p) => (p.transparent ? 'transparent' : 'rgb(var(--primary, 251, 107, 49))')};
  padding: 1.4rem 2.8rem;
  font-size: 1.3rem;
  color: ${(p) => (p.transparent ? 'rgb(var(--brandBlue, 0, 106, 173))' : '#FFFFFF')};
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: 9999px;
  border: ${(p) => (p.transparent ? '1.5px solid rgb(var(--brandBlue, 0, 106, 173))' : '1.5px solid rgb(var(--primary, 251, 107, 49))')};
  transition: all 0.2s ease-in-out;
  backface-visibility: hidden;
  will-change: transform;
  cursor: pointer;
  box-shadow: ${(p) => (p.transparent ? 'none' : '0 4px 14px rgba(251, 107, 49, 0.35)')};

  span {
    margin-left: 1rem;
  }

  &:hover {
    transform: translateY(-2px);
    background: ${(p) => (p.transparent ? 'rgb(var(--tertiary, 235, 246, 254))' : '#e0551e')};
    box-shadow: ${(p) => (p.transparent ? 'none' : '0 6px 20px rgba(251, 107, 49, 0.45)')};
  }
`;

export default Button;
