import React from 'react';
import styled from 'styled-components';

interface DateBadgeProps {
  date: string;
}

export default function DateBadge({ date }: DateBadgeProps) {
  // Always evaluate and format in fixed UTC timezone to prevent off-by-one errors (EV-4)
  const dateObj = new Date(date);
  const isValid = !isNaN(dateObj.getTime());

  let month = 'EVT';
  let day = '--';
  let year = '';

  if (isValid) {
    month = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short' }).format(dateObj).toUpperCase();
    day = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', day: '2-digit' }).format(dateObj);
    year = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric' }).format(dateObj);
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
    const parts = date.trim().split('-');
    year = parts[0];
    day = parts[2];
    const monthNum = parseInt(parts[1], 10);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    month = months[monthNum - 1] || 'EVT';
  }

  return (
    <BadgeRoot aria-label={`Event date: ${month} ${day} ${year}`}>
      <Month>{month}</Month>
      <Day>{day}</Day>
      {year && <Year>{year}</Year>}
    </BadgeRoot>
  );
}

const BadgeRoot = styled.div`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  background: rgba(var(--cardBackground), 0.94);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--lineColor), 0.85);
  border-radius: 0.8rem;
  padding: 0.6rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 4.8rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  z-index: 2;
  user-select: none;
`;

const Month = styled.span`
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 0.2rem;
`;

const Day = styled.span`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
  color: var(--text);
`;

const Year = styled.span`
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: var(--mutedColor);
  margin-top: 0.2rem;
`;
