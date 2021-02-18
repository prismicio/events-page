import { PrismicContext } from '@/contexts/index';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useContext } from 'react';
import Header from './header';

export default function Layout({ children }) {
  const [show] = useContext(PrismicContext);
  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <title>{show?.meta_title}</title>
        <meta name="og:image" content={show?.meta_image?.url}></meta>
        <meta name="twitter:image" content={show?.meta_image?.url}></meta>
        <meta name="description" content={show?.meta_description}></meta>
        <meta name="og:descriptions" content={show?.meta_description}></meta>
        <meta
          name="twitter:description"
          content={show?.meta_description}
        ></meta>
        <meta name="og:title" content={show?.meta_title}></meta>
        <meta name="twitter:title" content={show?.meta_title}></meta>
        <meta name="twitter:creator" content="@prismicio" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={`https://shows.prismic.io/${router.asPath}`}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
    </Fragment>
  );
}
