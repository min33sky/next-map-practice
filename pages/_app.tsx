import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Nanum_Gothic } from '@next/font/google';

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
      <Component {...pageProps} />
    </>
  );
}
