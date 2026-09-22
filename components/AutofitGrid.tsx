import styled from 'styled-components';

interface AutofitGridProps {
  minWidth?: string;
}

const AutofitGrid = styled.div<AutofitGridProps>`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(${(p) => p.minWidth || '24rem'}, 1fr));
  margin: 0 auto;
`;

export default AutofitGrid;
