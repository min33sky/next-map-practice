import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Nanum_Gothic } from '@next/font/google';
import { DefaultSeo } from 'next-seo';
import SEO from '../seo.config';
import Script from 'next/script';

const nanum = Nanum_Gothic({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${nanum.style.fontFamily};
        }
      `}</style>
      <DefaultSeo {...SEO} />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-4GR4WKG41N`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4GR4WKG41N');
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
