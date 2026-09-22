import NextLink from 'next/link';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';

type SingleFooterListItem = { title: string; href: string };
type FooterListItems = SingleFooterListItem[];
type SingleFooterList = { title: string; items: FooterListItems };
type FooterItems = SingleFooterList[];

const footerItems: FooterItems = [
  {
    title: 'Explore',
    items: [
      { title: 'Courses', href: '/courses' },
      { title: 'Tutorials', href: '/tutorials' },
      { title: 'Workshops', href: '/workshops' },
      { title: 'Training Programs', href: '/training' },
      { title: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Work With Us',
    items: [
      { title: 'Consulting Services', href: '/consulting' },
      { title: 'Customized Courses', href: '/courses' },
      { title: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    items: [
      { title: 'About SAGE', href: '/about' },
      { title: 'Global Team', href: '/team' },
      { title: 'News & Articles', href: '/news' },
      { title: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
];

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <ListContainer>
          {footerItems.map((singleItem) => (
            <FooterList key={singleItem.title} {...singleItem} />
          ))}
        </ListContainer>
        <BottomBar>
          <ShareBar>
            <a href="https://www.linkedin.com/in/shastry-associates-global-enterprises-sage/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#0A66C2" />
                <path fillRule="evenodd" clipRule="evenodd" d="M11.5 13H15V24H11.5V13ZM13.25 8.75C12.1454 8.75 11.25 9.64543 11.25 10.75C11.25 11.8546 12.1454 12.75 13.25 12.75C14.3546 12.75 15.25 11.8546 15.25 10.75C15.25 9.64543 14.3546 8.75 13.25 8.75ZM17.5 13H20.86V14.5H20.91C21.38 13.61 22.53 12.67 24.25 12.67C27.8 12.67 28.5 15.01 28.5 18.06V24H25V18.52C25 17.21 24.97 15.53 23.18 15.53C21.36 15.53 21.08 16.95 21.08 18.42V24H17.5V13Z" fill="white" />
              </svg>
            </a>

            <a href="https://www.facebook.com/profile.php?id=61561994620408" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#1877F2" />
                <path d="M21.5 18.5L22 15H18.5V12.75C18.5 11.8 19 10.9 20.5 10.9H22V8.04C22 8.04 20.64 7.8 19.34 7.8C16.63 7.8 14.85 9.46 14.85 12.45V15H11.75V18.5H14.85V27H18.5V18.5H21.5Z" fill="white" />
              </svg>
            </a>

            <a href="https://www.instagram.com/sage_global?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#E4405F" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 9H24C25.6569 9 27 10.3431 27 12V24C27 25.6569 25.6569 27 24 27H12C10.3431 27 9 25.6569 9 24V12C9 10.3431 10.3431 9 12 9ZM24 11H12C11.4477 11 11 11.4477 11 12V24C11 24.5523 11.4477 25 12 25H24C24.5523 25 25 24.5523 25 24V12C25 11.4477 24.5523 11 24 11ZM18 13.5C15.5147 13.5 13.5 15.5147 13.5 18C13.5 20.4853 15.5147 22.5 18 22.5C20.4853 22.5 22.5 20.4853 22.5 18C22.5 15.5147 20.4853 13.5 18 13.5ZM18 15.3C19.4912 15.3 20.7 16.5088 20.7 18C20.7 19.4912 19.4912 20.7 18 20.7C16.5088 20.7 15.3 19.4912 15.3 18C15.3 16.5088 16.5088 15.3 18 15.3ZM22.25 12.5C22.25 12.9142 21.9142 13.25 21.5 13.25C21.0858 13.25 20.75 12.9142 20.75 12.5C20.75 12.0858 21.0858 11.75 21.5 11.75C21.9142 11.75 22.25 12.0858 22.25 12.5Z" fill="white" />
              </svg>
            </a>
          </ShareBar>
          <Copyright>&copy; {new Date().getFullYear()} Shastry Associates Global Enterprises (SAGE). All rights reserved.</Copyright>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}

function FooterList({ title, items }: SingleFooterList) {
  return (
    <ListWrapper>
      <ListHeader>{title}</ListHeader>
      {items.map((singleItem) => (
        <ListItem key={singleItem.href} {...singleItem} />
      ))}
    </ListWrapper>
  );
}

function ListItem({ title, href }: SingleFooterListItem) {
  return (
    <ListItemWrapper>
      <NextLink href={href} passHref>
        <a>{title}</a>
      </NextLink>
    </ListItemWrapper>
  );
}

const FooterWrapper = styled.footer`
  padding-top: 4rem;
  padding-bottom: 3rem;
  background: rgb(var(--secondary));
  color: rgb(var(--textSecondary));
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListHeader = styled.h4`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  letter-spacing: 0.02em;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  margin-right: 4rem;

  & > *:not(:first-child) {
    margin-top: 0.8rem;
  }

  ${media('<=tablet')} {
    flex: 0 45%;
    margin-right: 1rem;
  }

  ${media('<=phone')} {
    flex: 0 100%;
    margin-right: 0rem;
  }
`;

const ListItemWrapper = styled.p`
  font-size: 1.4rem;

  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.75);
    transition: color 0.2s ease-in-out;

    &:hover {
      color: rgb(var(--skyBlue, 53, 169, 239));
    }
  }
`;

const ShareBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Copyright = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.6);

  ${media('<=tablet')} {
    margin-top: 1.5rem;
    text-align: center;
  }
`;

const BottomBar = styled.div`
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;
