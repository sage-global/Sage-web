import styled from 'styled-components';
import { media } from 'utils/media';

const OverTitle = styled.span`
  display: block;
  color: rgb(var(--brandBlue, 0, 106, 173));
  &::before {
    position: relative;
    bottom: -0.1em;
    content: '';
    display: inline-block;
    width: 0.9em;
    height: 0.9em;
    border-radius: 0.2rem;
    background-color: rgb(var(--skyBlue, 53, 169, 239));
    line-height: 0;
    margin-right: 1em;
  }

  font-size: 1.3rem;
  letter-spacing: 0.08em;
  font-weight: 700;
  line-height: 0;
  text-transform: uppercase;

  html[data-theme='dark'] & {
    color: #ffffff;
  }

  ${media('<=desktop')} {
    line-height: 1.5;
  }
`;

export default OverTitle;
