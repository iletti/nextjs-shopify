/** @jsxRuntime classic */
/** @jsx jsx */
import { Heading, jsx } from 'theme-ui';
import { Card, Text } from '@theme-ui/components';
import ImageCarousel from '@components/common/ImageCarousel';
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product';
import Link from '@components/common/Link';

export interface ProductCardProps {
  className?: string;
  product: ShopifyBuy.Product;
  imgWidth: number;
  imgHeight: number;
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined;
  imgPriority?: boolean;
  fillImage?: boolean;
  imgLoading?: 'eager' | 'lazy';
  imgSizes?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const handle = (product as any).handle;
  const productVariant: any = product.variants[0];
  const price = getPrice(
    productVariant.priceV2.amount,
    productVariant.priceV2.currencyCode
  );

  const hasSale = productVariant.compareAtPriceV2;
  const salePrice = hasSale
    ? getPrice(productVariant.compareAtPriceV2.amount, productVariant.compareAtPriceV2.currencyCode)
    : null;

    return (
      <Card
        sx={{
          position: 'relative',
          maxWidth: [700, imgWidth || 540],
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          // Add this to give a z-index higher than the image/carousel
          zIndex: 1,
        }}
      >
        {hasSale && (
          <div sx={{
            position: 'absolute',
            top: 2, // Adjust as needed
            right: 2, // Adjust as needed
            backgroundColor: '#FEFCEF', // Changed to your specified color
            color: 'white',
            padding: '0.5em',
            borderRadius: '4px',
            fontSize: '0.8em',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            // Ensure the badge is above all other content
            zIndex: 2,
          }}>
            Sale
          </div>
        )}
      <Link
        href={`/product/${handle}/`}
        sx={{
          color: 'inherit',
        }}
      >
        <div sx={{ flexGrow: 1 }}>
          <ImageCarousel
            currentSlide={product.images ? product.images.length - 1 : 0}
            width={imgWidth}
            height={imgHeight}
            priority={imgPriority}
            loading={imgLoading}
            layout={imgLayout}
            sizes={imgSizes}
            alt={product.title}
            images={
              product.images.length
                ? product.images
                : [
                    {
                      src: `https://via.placeholder.com/${imgWidth}x${imgHeight}`,
                    },
                  ]
            }
          />
        </div>
        <div sx={{ textAlign: 'center' }}>
          <Heading as="h2" sx={{ mt: 4, mb: 0, fontSize: 14 }}>
            {product.title}
          </Heading>
          <Text sx={{ fontSize: 12, mb: 2 }}>
            {hasSale ? <span sx={{ textDecoration: 'line-through' }}>{salePrice}</span> : null}
            {' '}{price}
          </Text>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
