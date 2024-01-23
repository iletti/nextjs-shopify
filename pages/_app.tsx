import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Layout from '@components/common/Layout';
import { builder, Builder } from '@builder.io/react';
import builderConfig from '@config/builder';

// Initialize the Builder.io SDK
builder.init(builderConfig.apiKey);

// Import your Builder.io widgets and custom components
import '@builder.io/widgets';
import '../blocks/ProductGrid/ProductGrid.builder';
import '../blocks/CollectionView/CollectionView.builder';
import '../blocks/ProductView/ProductView.builder';
import '../blocks/CloudinaryImage/CloudinaryImage.builder';
import '../blocks/CollectionSlider/CollectionSlider.builder';


// Register insert menus for Builder.io components
Builder.register('insertMenu', {
  name: 'Shopify Collections Components',
  items: [
    { name: 'CollectionBox', label: 'Collection stuff' },
    { name: 'ProductCollectionGrid' },
    { name: 'CollectionView' },
  ],
});

Builder.register('insertMenu', {
  name: 'Shopify Products Components',
  items: [
    { name: 'ProductGrid' },
    { name: 'ProductBox' },
    { name: 'ProductView' },
  ],
});

Builder.register('insertMenu', {
  name: 'Cloudinary Components',
  items: [{ name: 'CloudinaryImage' }],
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Place any additional GA4 initialization logic here if needed
  }, []);

  return (
    <>
      {/* Google Analytics Scripts */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      
      {/* Layout and Page Component */}
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
