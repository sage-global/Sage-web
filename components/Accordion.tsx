import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { media } from 'utils/media';
import Collapse from './Collapse';
import RichText from './RichText';

interface AccordionProps {
  title: string;
  isOpen?: boolean;
  onToggle?: () => void;
  id?: string;
}

export default function Accordion({ title, isOpen, onToggle, id, children }: PropsWithChildren<AccordionProps>) {
  const [hasCollapsed, setHasCollapsed] = useState(isOpen === undefined ? true : !isOpen);
  const isControlled = isOpen !== undefined;
  const isActive = isControlled ? isOpen : !hasCollapsed;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    if (!isControlled) {
      setHasCollapsed((prev) => !prev);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <AccordionWrapper
      id={id}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
    >
      <TitleWrapper>
        <Title>{title}</Title>
        <Icon isActive={isActive} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            className="chakra-icon chakra-accordion__icon css-j2ph2z"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          </svg>
        </Icon>
      </TitleWrapper>
      <Collapse isOpen={isActive} duration={300}>
        <Description>
          <RichText>{children}</RichText>
        </Description>
      </Collapse>
    </AccordionWrapper>
  );
}

const Title = styled.h3`
  font-size: 2rem;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.div<{ isActive: boolean }>`
  width: 2.4rem;
  transition: transform 0.3s;
  transform: rotateZ(${(p) => (p.isActive ? 180 : 0)}deg);
`;

const Description = styled.div`
  margin-top: 2.5rem;
  font-size: 1.6rem;
  font-weight: normal;
`;

const AccordionWrapper = styled.div<PropsWithChildren<{}>>`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  background: rgb(var(--cardBackground));
  box-shadow: var(--shadow-md);
  cursor: pointer;
  border-radius: 0.6rem;
  transition: opacity 0.2s, box-shadow 0.2s;

  &:focus-visible {
    outline: 2px solid rgb(var(--brandBlue, 0, 106, 173));
    outline-offset: 2px;
  }

  ${media('<=desktop')} {
    width: 100%;
  }
`;
