import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkLoaded, ClerkProvider } from '@clerk/nextjs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <ClerkLoaded>
        <Component {...pageProps} />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default MyApp;
