import type { AppProps } from 'next/app';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import '../styles/globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${body.variable} font-body`}>
      <Component {...pageProps} />
    </div>
  );
}
