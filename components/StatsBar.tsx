import styled from 'styled-components'

export interface StatItem {
  value: string
  unit?: string
  label: string
}

export interface StatsBarProps {
  items?: StatItem[]
}

const defaultStats: StatItem[] = [
  { value: '25', unit: '+', label: 'Years Applied Experience' },
  { value: '500', unit: '+', label: 'Engineers & Researchers Trained' },
  { value: '4', unit: ' Global', label: 'Partner Regions (US, IN, KR, EU)' },
]

export default function StatsBar({ items = defaultStats }: StatsBarProps) {
  return (
    <StatsGrid>
      {items.map((stat, idx) => (
        <StatRoot key={idx}>
          <StatValueGroup>
            <StatValue>{stat.value}</StatValue>
            {stat.unit && <StatUnit>{stat.unit}</StatUnit>}
          </StatValueGroup>
          <StatLabel>{stat.label}</StatLabel>
        </StatRoot>
      ))}
    </StatsGrid>
  )
}

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 2rem;
  padding: 3rem 2.5rem;
  background: var(--cardBackground);
  border: 1px solid var(--lineColor);
  border-radius: 1.6rem;
  box-shadow: 0 10px 30px rgba(0, 106, 173, 0.05);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem 1.5rem;
  }
`

const StatRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StatValueGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  font-family: var(--font-heading);
  line-height: 1;
`

const StatValue = styled.span`
  font-size: 4.8rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--brandBlue);
`

const StatUnit = styled.span`
  font-size: 3.2rem;
  font-weight: 800;
  color: var(--primary);
`

const StatLabel = styled.span`
  margin-top: 0.8rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--mutedColor);
  line-height: 1.4;
`
