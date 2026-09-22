import React, { HTMLProps, Ref } from 'react';
import styled from 'styled-components';

export type IconId = 'training' | 'consulting' | 'custom-courses' | 'workshops' | 'courses' | 'tutorials' | 'news' | 'events';

export type IconProps = HTMLProps<HTMLButtonElement> & {
  _ref?: Ref<HTMLButtonElement>;
  id?: string;
  name?: string;
  iconId?: IconId | string;
  size?: string | number;
  color?: string;
};

export function renderSvgIcon(iconName?: string, size: string | number = '2.4rem', color = 'currentColor') {
  const formattedSize = typeof size === 'number' ? `${size}px` : size;
  const svgProps = {
    width: formattedSize,
    height: formattedSize,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (iconName) {
    case 'training':
      return (
        <svg {...svgProps}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'consulting':
      return (
        <svg {...svgProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'custom-courses':
    case 'custom':
      return (
        <svg {...svgProps}>
          <path d="M4 21v-7" />
          <path d="M4 10V3" />
          <path d="M12 21v-9" />
          <path d="M12 8V3" />
          <path d="M20 21v-5" />
          <path d="M20 12V3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      );
    case 'workshops':
      return (
        <svg {...svgProps}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'courses':
      return (
        <svg {...svgProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M12 6h4" />
          <path d="M12 10h4" />
        </svg>
      );
    case 'tutorials':
      return (
        <svg {...svgProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Icon({ _ref, id, name, iconId, size, color, children, ...rest }: any) {
  const targetIcon = iconId || id || name;

  if (!children && targetIcon) {
    return (
      <IconSpan {...rest}>
        {renderSvgIcon(targetIcon, size || '2.4rem', color || 'currentColor')}
      </IconSpan>
    );
  }

  return (
    <IconWrapper type="button" {...rest} {...(_ref && { ref: _ref })}>
      {children || renderSvgIcon(targetIcon, size || '2.4rem', color || 'currentColor')}
    </IconWrapper>
  );
}

const IconWrapper = styled.button`
  border: none;
  background-color: transparent;
  width: 4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const IconSpan = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;
