import NextImage from 'next/image';
import styled from 'styled-components';

interface BasicCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function BasicCard({ title, description, imageUrl }: BasicCardProps) {
  return (
    <Card>
      <NextImage src={imageUrl} width={128} height={128} alt={title} />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  padding: 3rem 2.5rem;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 234, 231, 228));
  box-shadow: var(--shadow-sm);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  border-radius: 0.8rem;
  color: rgb(var(--text));
  font-size: 1.6rem;
  transition: all 0.2s ease-in-out;

  & > *:not(:first-child) {
    margin-top: 1.2rem;
  }

  &:hover {
    box-shadow: 0 10px 25px -5px rgba(53, 169, 239, 0.15);
    border-color: rgb(var(--skyBlue, 53, 169, 239));
    transform: translateY(-3px);
  }
`;

const Title = styled.h3`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 2rem;
`;

const Description = styled.div`
  color: rgb(var(--mutedColor, 112, 109, 106));
  line-height: 1.6;
`;
