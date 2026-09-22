import styled from 'styled-components'
import { TimelineStep } from 'sage-data'

export interface HeritageTimelineProps {
  steps: TimelineStep[]
}

export default function HeritageTimeline({ steps }: HeritageTimelineProps) {
  return (
    <TimelineRoot>
      {steps.map((step, idx) => (
        <TimelineItem key={idx}>
          <TimelineIndicatorGroup>
            <TimelineDot />
            {idx < steps.length - 1 && <TimelineConnector />}
          </TimelineIndicatorGroup>
          <TimelineContent>
            <TimelineYearBadge>{step.year}</TimelineYearBadge>
            <TimelineTitle>{step.title}</TimelineTitle>
            <TimelineDescription>{step.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineRoot>
  )
}

const TimelineRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  position: relative;
`

const TimelineItem = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`

const TimelineIndicatorGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`

const TimelineDot = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background: var(--primary);
  border: 3px solid var(--cardBackground);
  box-shadow: 0 0 0 2px var(--primary);
  flex-shrink: 0;
`

const TimelineConnector = styled.div`
  width: 2px;
  flex: 1;
  background: var(--lineColor);
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
`

const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-bottom: 1rem;
`

const TimelineYearBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brandBlue);
`

const TimelineTitle = styled.h4`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
`

const TimelineDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--mutedColor);
`
