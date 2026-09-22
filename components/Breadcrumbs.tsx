import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import type { Crumb } from 'sage-data';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--muted);
`;

const CrumbItem = styled.span`
  &:not(:last-child)::after {
    content: '›';
    margin: 0 0.5rem;
    color: var(--muted);
  }
`;

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <Nav aria-label="breadcrumb">
      {crumbs.map((c, i) => (
        <CrumbItem key={c.href}>
          {i === crumbs.length - 1 ? (
            <span>{c.label}</span>
          ) : (
            <Link href={c.href}>{c.label}</Link>
          )}
        </CrumbItem>
      ))}
    </Nav>
  );
}
