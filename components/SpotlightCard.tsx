import React, { MouseEvent, useRef, useState } from 'react';
import styled from 'styled-components';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  spotlightColor = 'rgba(251, 107, 49, 0.12)', // Primary orange with low opacity
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <CardWrapper
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <SpotlightLayer
        $opacity={opacity}
        $x={position.x}
        $y={position.y}
        $color={spotlightColor}
      />
      <ContentWrapper>{children}</ContentWrapper>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1.6rem;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  padding: 3.2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: rgba(251, 107, 49, 0.3);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  }
`;

const SpotlightLayer = styled.div<{ $opacity: number; $x: number; $y: number; $color: string }>`
  position: absolute;
  pointer-events: none;
  inset: 0;
  opacity: ${(p) => p.$opacity};
  transition: opacity 0.3s ease;
  background: radial-gradient(
    600px circle at ${(p) => p.$x}px ${(p) => p.$y}px,
    ${(p) => p.$color},
    transparent 40%
  );
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
