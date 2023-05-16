import "styles/global.scss";
import type { AppProps } from 'next/app'
import Head from 'next/head';
import config from "config.json";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
