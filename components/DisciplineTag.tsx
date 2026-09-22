import styled from 'styled-components'

export interface DisciplineTagProps {
  children: React.ReactNode
  variant?: 'solid' | 'outline' | 'subtle'
  colorScheme?: 'orange' | 'blue' | 'slate'
}

export default function DisciplineTag({
  children,
  variant = 'solid',
  colorScheme = 'orange',
}: DisciplineTagProps) {
  return (
    <TagRoot variant={variant} colorScheme={colorScheme}>
      {children}
    </TagRoot>
  )
}

const TagRoot = styled.span<{
  variant: 'solid' | 'outline' | 'subtle'
  colorScheme: 'orange' | 'blue' | 'slate'
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;

  ${(p) => {
    if (p.variant === 'solid' && p.colorScheme === 'orange') {
      return `
        background: var(--primary);
        color: #ffffff;
      `
    }
    if (p.variant === 'outline') {
      return `
        background: transparent;
        border: 1px solid var(--lineColor);
        color: var(--text);
      `
    }
    if (p.variant === 'subtle' && p.colorScheme === 'blue') {
      return `
        background: var(--tertiary);
        color: var(--brandBlue);
      `
    }
    // subtle orange default fallback
    return `
      background: rgba(var(--primary), 0.12);
      color: var(--primary);
    `
  }}
`
