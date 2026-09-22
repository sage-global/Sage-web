import styled from 'styled-components'
import Container from 'components/Container'
import OverTitle from 'components/OverTitle'
import SectionTitle from 'components/SectionTitle'
import HeritageTimeline from 'components/HeritageTimeline'
import { aboutHeritageTimeline, aboutFull } from 'sage-data'

export default function StorySection() {
  return (
    <SectionWrapper>
      <Container>
        <StoryGrid>
          <StoryColumn>
            <OverTitle>03 / OUR HERITAGE</OverTitle>
            <SectionTitle>Engineers teaching engineers across three decades</SectionTitle>
            <StoryParagraphs>
              <Paragraph>
                SAGE (Shastry Associates Global Enterprises) is an international group of highly
                accomplished engineers and entrepreneurs with a long track record of engineering and
                technology experience in industry and academia.
              </Paragraph>
              <Paragraph>
                Our mission focuses on disseminating practical engineering knowledge in applied
                electromagnetics, microwave circuits, antenna arrays, and wireless communication
                systems to bridge the gap between textbook theory and real-world industrial R&D.
              </Paragraph>
            </StoryParagraphs>

            {/* Chakra Blockquote Pattern */}
            <ChakraBlockquote>
              <QuoteMark>“</QuoteMark>
              <QuoteText>
                We do not teach generic surface-level tech. We empower engineers with the exact mathematical
                and bench measurement tools required to deliver high-yield wireless hardware.
              </QuoteText>
              <QuoteAuthor>— Dr. S. R. Shastry, Founder & Principal Fellow</QuoteAuthor>
            </ChakraBlockquote>
          </StoryColumn>

          <TimelineColumn>
            <TimelineHeader>Key Heritage Milestones</TimelineHeader>
            <HeritageTimeline steps={aboutHeritageTimeline} />
          </TimelineColumn>
        </StoryGrid>
      </Container>
    </SectionWrapper>
  )
}

const SectionWrapper = styled.section`
  padding: 10rem 0;
  background: var(--background);
`

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  align-items: flex-start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 6rem;
  }
`

const StoryColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const StoryParagraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 2rem;
  margin-bottom: 3.6rem;
`

const Paragraph = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: var(--mutedColor);
`

const ChakraBlockquote = styled.blockquote`
  position: relative;
  background: var(--tertiary);
  border-left: 4px solid var(--primary);
  border-radius: 0 1.6rem 1.6rem 0;
  padding: 3rem 3rem 3rem 3.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const QuoteMark = styled.span`
  position: absolute;
  top: -1rem;
  left: 1.6rem;
  font-family: var(--font-heading);
  font-size: 6rem;
  color: rgba(var(--primary), 0.2);
  line-height: 1;
`

const QuoteText = styled.p`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--brandBlue);
  line-height: 1.5;
  font-style: italic;
`

const QuoteAuthor = styled.cite`
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--mutedColor);
  font-style: normal;
`

const TimelineColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background: var(--cardBackground);
  border: 1px solid var(--lineColor);
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
`

const TimelineHeader = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--text);
  border-bottom: 1px solid var(--lineColor);
  padding-bottom: 1.6rem;
`
