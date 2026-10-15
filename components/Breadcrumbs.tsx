import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import type { Crumb } from 'sage-data';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: rgb(var(--mutedColor));
`;

const CrumbItem = styled.span`
  display: inline-flex;
  align-items: center;

  &:not(:last-child)::after {
    content: '›';
    margin: 0 0.6rem;
    color: rgb(var(--mutedColor));
    opacity: 0.7;
    font-weight: 400;
  }
`;

const CrumbLink = styled.a`
  color: rgb(var(--brandBlue));
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s ease;

  &:link,
  &:visited {
    color: rgb(var(--brandBlue)) !important;
  }

  &:hover,
  &:focus {
    color: rgb(var(--primary)) !important;
    text-decoration: underline;
  }
`;

const CurrentCrumb = styled.span`
  color: rgb(var(--text));
  font-weight: 600;
  opacity: 0.9;
`;

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <Nav aria-label="breadcrumb">
      {crumbs.map((c, i) => (
        <CrumbItem key={c.href}>
          {i === crumbs.length - 1 ? (
            <CurrentCrumb>{c.label}</CurrentCrumb>
          ) : (
            <NextLink href={c.href} passHref>
              <CrumbLink>{c.label}</CrumbLink>
            </NextLink>
          )}
        </CrumbItem>
      ))}
    </Nav>
  );
}
