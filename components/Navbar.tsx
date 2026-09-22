import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { ScrollPositionEffectProps, useScrollPosition } from 'hooks/useScrollPosition';
import { NavItems, SingleNavItem } from 'types';
import { media } from 'utils/media';
import Button from './Button';
import Container from './Container';
import Drawer from './Drawer';
import { HamburgerIcon } from './HamburgerIcon';
import Logo from './Logo';

const ColorSwitcher = dynamic(() => import('../components/ColorSwitcher'), { ssr: false });

type NavbarProps = { items: NavItems };
type ScrollingDirections = 'up' | 'down' | 'none';
type NavbarContainerProps = { hidden: boolean; transparent: boolean };

export default function Navbar({ items }: NavbarProps) {
  const router = useRouter();
  const { toggle } = Drawer.useDrawer();
  const [scrollingDirection, setScrollingDirection] = useState<ScrollingDirections>('none');

  let lastScrollY = useRef(0);
  const lastRoute = useRef('');
  const stepSize = useRef(50);

  useScrollPosition(scrollPositionCallback, [router.asPath], undefined, undefined, 50);

  function scrollPositionCallback({ currPos }: ScrollPositionEffectProps) {
    const routerPath = router.asPath;
    const currentY = Math.abs(currPos.y);

    if (routerPath !== lastRoute.current) {
      lastRoute.current = routerPath;
      lastScrollY.current = currentY;
      setScrollingDirection('none');
      return;
    }

    // Always keep visible when near the top of the page (< 80px)
    if (currentY < 80) {
      if (scrollingDirection !== 'none') {
        setScrollingDirection('none');
      }
      lastScrollY.current = currentY;
      return;
    }

    const diff = currentY - lastScrollY.current;

    // Minimum scroll threshold of 15px to prevent flickering on small movements
    if (Math.abs(diff) < 15) {
      return;
    }

    if (diff > 0 && scrollingDirection !== 'down') {
      setScrollingDirection('down');
      lastScrollY.current = currentY;
    } else if (diff < 0 && scrollingDirection !== 'up') {
      setScrollingDirection('up');
      lastScrollY.current = currentY;
    }
  }

  const isNavbarHidden = scrollingDirection === 'down';
  const isTransparent = scrollingDirection === 'none';

  return (
    <NavbarContainer hidden={isNavbarHidden} transparent={isTransparent}>
      <Content>
        <NextLink href="/" passHref>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </NextLink>
        <NavItemList>
          {items.map((singleItem) => (
            <NavItem key={singleItem.href} {...singleItem} />
          ))}
        </NavItemList>
        <ColorSwitcherContainer>
          <ColorSwitcher />
        </ColorSwitcherContainer>
        <HamburgerMenuWrapper>
          <HamburgerIcon aria-label="Toggle menu" onClick={toggle} />
        </HamburgerMenuWrapper>
      </Content>
    </NavbarContainer>
  );
}

function NavItem({ href, title, outlined, highlighted, subItems }: SingleNavItem) {
  const { setIsModalOpened } = useNewsletterModalContext();
  const [isOpen, setIsOpen] = useState(false);

  function showNewsletterModal() {
    setIsModalOpened(true);
  }

  if (outlined) {
    if (href) {
      return (
        <NextLink href={href} passHref>
          <CustomButtonLink>{title}</CustomButtonLink>
        </NextLink>
      );
    }
    return <CustomButton onClick={showNewsletterModal}>{title}</CustomButton>;
  }

  const hasSubItems = subItems && subItems.length > 0;

  return (
    <NavItemWrapper
      outlined={outlined}
      highlighted={highlighted}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NextLink href={href} passHref>
        <NavLink highlighted={highlighted}>
          {title}
          {hasSubItems && (
            <ChevronIcon viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </ChevronIcon>
          )}
        </NavLink>
      </NextLink>
      {hasSubItems && isOpen && (
        <DropdownMenu>
          {subItems.map((sub) => (
            <NextLink key={sub.href} href={sub.href} passHref>
              <DropdownItem>{sub.title}</DropdownItem>
            </NextLink>
          ))}
        </DropdownMenu>
      )}
    </NavItemWrapper>
  );
}

const CustomButtonLink = styled.a`
  display: inline-block;
  text-decoration: none;
  text-align: center;
  padding: 0.75rem 1.6rem;
  line-height: 1.8;
  background-color: rgb(var(--primary, 251, 107, 49));
  color: #ffffff !important;
  border-radius: 0.6rem;
  font-family: var(--font-body);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(251, 107, 49, 0.35);

  &:hover {
    background-color: #e0551b;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(251, 107, 49, 0.45);
    color: #ffffff !important;
  }
`;

const CustomButton = styled(Button)`
  padding: 0.75rem 1.6rem;
  line-height: 1.8;
  background-color: rgb(var(--primary, 251, 107, 49));
  color: #ffffff;
  border-radius: 0.6rem;
  font-weight: 700;

  &:hover {
    background-color: #e0551b;
    transform: translateY(-1px);
  }
`;

const NavItemList = styled.div`
  display: flex;
  align-items: center;
  list-style: none;

  ${media('<desktop')} {
    display: none;
  }
`;

const HamburgerMenuWrapper = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.6rem;
  border-radius: 0.6rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: #ffffff;
  }

  ${media('>=desktop')} {
    display: none;
  }
`;

const LogoWrapper = styled.a`
  display: flex;
  margin-right: auto;
  text-decoration: none;
  color: #ffffff;
`;

const ChevronIcon = styled.svg`
  width: 1.4rem;
  height: 1.4rem;
  margin-left: 0.4rem;
  fill: #ffffff;
  transition: transform 0.2s ease-in-out;
`;

const NavLink = styled.a<{ highlighted?: boolean }>`
  display: flex;
  align-items: center;
  color: #ffffff !important;
  background-color: ${(p) => (p.highlighted ? 'rgb(var(--primary, 251, 107, 49))' : 'transparent')};
  border-radius: 0.6rem;
  padding: 0.75rem 1.4rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #ffffff !important;
    background-color: ${(p) => (p.highlighted ? '#e0551b' : 'rgba(255, 255, 255, 0.18)')};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 20rem;
  background: #005a93;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  padding: 0.8rem 0;
  z-index: 100;
  animation: fadeIn 0.2s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: 0;
    right: 0;
    height: 1rem;
  }

  html[data-theme='dark'] & {
    background: #003e66;
    border: 1.5px solid rgba(53, 169, 239, 0.4);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.a`
  display: block;
  padding: 0.9rem 1.6rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  text-transform: none;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    color: #ffffff;
  }
`;

const NavItemWrapper = styled.li<Partial<SingleNavItem>>`
  position: relative;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  line-height: 2;

  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const NavbarContainer = styled.div<NavbarContainerProps>`
  display: flex;
  position: sticky;
  top: 0;
  padding: 1.2rem 0;
  width: 100%;
  height: 8rem;
  z-index: var(--z-navbar);

  /* Light Mode SAGE Deep Blue background */
  background-color: #006aad;
  box-shadow: 0 4px 20px rgba(0, 106, 173, 0.35);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);

  /* Dark Mode Ultra-Rich Oceanic Blue background */
  html[data-theme='dark'] & {
    background-color: #004d7e;
    border-bottom: 1px solid rgba(53, 169, 239, 0.3);
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.45);
  }

  transform: ${(p) => (p.hidden ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)')};
  will-change: transform;

  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.25s ease,
              box-shadow 0.25s ease;
`;

const Content = styled(Container)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ColorSwitcherContainer = styled.div`
  width: 4rem;
  margin: 0 1rem;
`;
