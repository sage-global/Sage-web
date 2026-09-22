import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { AppProps } from 'next/dist/shared/lib/router/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ColorModeScript } from 'nextjs-color-mode';
import React, { PropsWithChildren } from 'react';

import Footer from 'components/Footer';
import { GlobalStyle } from 'components/GlobalStyles';
import Navbar from 'components/Navbar';
import NavigationDrawer from 'components/NavigationDrawer';
import NewsletterModal from 'components/NewsletterModal';
import WaveCta from 'components/WaveCta';
import { NewsletterModalContextProvider, useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { NavItems } from 'types';

const navItems: NavItems = [
  { title: 'Home', href: '/' },
  {
    title: 'About Us',
    href: '/about',
    subItems: [
      { title: 'Faculty & Team', href: '/team' },
      { title: 'Mission & Vision', href: '/mission' },
    ],
  },
  {
    title: 'Services',
    href: '/services',
    subItems: [
      { title: 'Courses', href: '/courses' },
      { title: 'Tutorials', href: '/tutorials' },
      { title: 'Workshops', href: '/workshops' },
      { title: 'Training', href: '/training' },
      { title: 'Consulting', href: '/consulting' },
    ],
  },
  {
    title: 'News',
    href: '/news',
    subItems: [
      { title: 'Events', href: '/events' },
      { title: 'Photo Gallery', href: '/events#gallery' },
    ],
  },
  { title: 'Contact Us', href: '/contact', outlined: true },
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ColorModeScript />
      <GlobalStyle />

      <Providers>
        <Modals />
        <Navbar items={navItems} />
        <Component {...pageProps} />
        {!pageProps?.hideDefaultWaveCta && <WaveCta />}
        <Footer />
      </Providers>
    </>
  );
}

function Providers<T>({ children }: PropsWithChildren<T>) {
  return (
    <NewsletterModalContextProvider>
      <NavigationDrawer items={navItems}>{children}</NavigationDrawer>
    </NewsletterModalContextProvider>
  );
}

function Modals() {
  const { isModalOpened, setIsModalOpened } = useNewsletterModalContext();
  if (!isModalOpened) {
    return null;
  }
  return <NewsletterModal onClose={() => setIsModalOpened(false)} />;
}

export default MyApp;
