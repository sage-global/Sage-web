import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { AppProps } from 'next/dist/shared/lib/router/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ColorModeScript } from 'nextjs-color-mode';
import React, { PropsWithChildren, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Footer from 'components/Footer';
import { GlobalStyle } from 'components/GlobalStyles';
import Navbar from 'components/Navbar';
import NavigationDrawer from 'components/NavigationDrawer';
import NewsletterModal from 'components/NewsletterModal';
import WaveCta from 'components/WaveCta';
import { NewsletterModalContextProvider, useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { NavItems } from 'types';
import { GA_TRACKING_ID, pageview } from 'utils/analytics';

function getNavItems(setIsModalOpened: (opened: boolean) => void): NavItems {
  return [
    { title: 'Home', href: '/' },
    {
      title: 'About Us',
      href: '/about',
      subItems: [
        { title: 'Meet Our Team', href: '/team' },
        { title: 'Mission & Vision', href: '/about#mission' },
      ],
    },
    {
      title: 'Services',
      href: '/services',
      subItems: [
        { title: 'Courses', href: '/courses' },
        { title: 'Tutorials', href: '/tutorials' },
        { title: 'Training', href: '/training' },
        { title: 'Consulting', href: '/consulting' },
      ],
    },
    {
      title: 'Events',
      href: '/events',
      subItems: [
        { title: 'Upcoming & Past Events', href: '/events' },
        { title: 'Photo Gallery', href: '/gallery' },
      ],
    },
    {
      title: 'News',
      href: '/news',
    },
    { title: 'Contact Us', href: '/contact', outlined: true },
  ];
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ColorModeScript />
      <GlobalStyle />

      <NewsletterModalContextProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </NewsletterModalContextProvider>
      {/* Google Analytics (GA4) Tag Manager */}
      {GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Vercel Web Analytics & Core Web Vitals */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

function AppContent({ Component, pageProps }: any) {
  const { setIsModalOpened } = useNewsletterModalContext();
  const navItems = getNavItems(setIsModalOpened);

  return (
    <NavigationDrawer items={navItems}>
      <Modals />
      <Navbar items={navItems} />
      <Component {...pageProps} />
      {!pageProps?.hideDefaultWaveCta && <WaveCta />}
      <Footer />
    </NavigationDrawer>
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
