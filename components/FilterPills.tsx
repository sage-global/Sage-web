import styled from 'styled-components'
import { DISCIPLINES, DisciplineId } from 'sage-data'

export interface FilterOption {
  id: string
  label: string
}

export interface FilterPillsProps {
  activeId: string
  onSelect: (id: any) => void
  options?: FilterOption[]
  ariaLabel?: string
}

export default function FilterPills({ activeId, onSelect, options, ariaLabel }: FilterPillsProps) {
  const items = options || DISCIPLINES

  return (
    <SegmentGroupRoot role="tablist" aria-label={ariaLabel || 'Filter options'}>
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <SegmentItem
            key={item.id}
            role="tab"
            aria-selected={isActive}
            isActive={isActive}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </SegmentItem>
        )
      })}
    </SegmentGroupRoot>
  )
}

const SegmentGroupRoot = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 9999px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    border-radius: 1.6rem;
    width: 100%;
    justify-content: center;
    padding: 1.2rem;
  }
`

const SegmentItem = styled.button<{ isActive: boolean }>`
  border: none;
  background: ${(p) => (p.isActive ? 'rgb(var(--brandBlue))' : 'transparent')};
  color: ${(p) => (p.isActive ? '#ffffff' : 'rgb(var(--mutedColor))')};
  font-family: var(--font-body);
  font-size: 1.4rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  ${(p) => p.isActive && `
    box-shadow: 0 4px 12px rgba(0, 106, 173, 0.25);
  `}

  &:hover {
    color: ${(p) => (p.isActive ? '#ffffff' : 'rgb(var(--text))')};
    background: ${(p) => (p.isActive ? 'rgb(var(--brandBlue))' : 'rgb(var(--tertiary))')};
    transform: ${(p) => (p.isActive ? 'scale(1.02)' : 'none')};
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid rgb(var(--primary));
    outline-offset: 2px;
  }
`
