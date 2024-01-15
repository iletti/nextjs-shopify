/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import { Grid, Button, Heading } from '@theme-ui/components'
import OptionPicker from '@components/common/OptionPicker'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/common/context'
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks'
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
  getPrice,
} from '@lib/shopify/storefront-data-hooks/src/utils/product'
import ImageCarousel from '@components/common/ImageCarousel'
import ProductLoader from './ProductLoader'

interface Props {
  className?: string
  children?: any
  product: ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
}

const ProductBox: React.FC<Props> = ({
  product,
  renderSeo,
  description = product.description,
  title = product.title,
}) => {
  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()
  const colors: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'color')
    ?.values?.map((op) => op.value as string)

  const sizes: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'size')
    ?.values?.map((op) => op.value as string)

  const variants = useMemo(
    () => prepareVariantsWithOptions(product?.variants),
    [product?.variants]
  )
  const images = useMemo(
    () => prepareVariantsImages(variants, 'color'),
    [variants]
  )

  const { openSidebar } = useUI()

  const [variant, setVariant] = useState(variants[0] || {})
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)

  useEffect(() => {
    const newVariant = variants.find((variant) => {
      return (
        (variant.size === size || !size) && (variant.color === color || !color)
      )
    })

    if (variant.id !== newVariant?.id) {
      setVariant(newVariant)
    }
  }, [size, color, variants, variant.id])

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem(variant.id, 1)
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const allImages = images
  .map(({ src }) => ({ src: src.src }))
  .concat(
    product.images &&
      product.images.filter(
        ({ src }) => !images.find((image) => image.src.src === src)
      )
  );

const hasSale = variant.compareAtPriceV2 && parseFloat(variant.compareAtPriceV2.amount) > parseFloat(variant.priceV2.amount);
const salePrice = hasSale
? getPrice(variant.compareAtPriceV2.amount, variant.compareAtPriceV2.currencyCode)
: null;

return (
  <React.Fragment>
    {renderSeo && (
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          title: title,
          description: description,
          images: [
            {
              // Correction: Ensure the URL is a string.
              url: product.images?.[0]?.src || '',
              width: 800,
              height: 600,
              alt: title,
            },
          ],
        }}
      />
    )}
    <Grid gap={4} columns={[1, 2]}>
      <div>
        {hasSale && (
          <div sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            backgroundColor: '#F29F05', // Sale badge color
            color: 'white',
            padding: '0.5em',
            borderRadius: '4px',
            fontSize: '0.8em',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            zIndex: '9999', // Ensure the badge is above other content
          }}>
            Sale
          </div>
        )}
        <div
          sx={{
            border: '1px solid gray',
            padding: 2,
            marginBottom: 2,
          }}
        >
          <ImageCarousel
            showZoom
            alt={title}
            width={1050}
            height={1050}
            priority
            onThumbnailClick={(index) => {
              if (images[index]?.color) {
                setColor(images[index].color)
              }
            }}
            images={
              allImages?.length > 0
                ? allImages
                : [
                    {
                      // Correction: Template literal should be used for the placeholder image URL.
                      src: 'https://via.placeholder.com/1050x1050',
},
]
}
/>
</div>
</div>
<div sx={{ display: 'flex', flexDirection: 'column' }}>
<span sx={{ mt: 0, mb: 2 }}>
<Heading>{title}</Heading>
<Heading as="h4" aria-label="price" sx={{ mt: 0, mb: 2 }}>
{hasSale ? (
<>
<span sx={{ textDecoration: 'line-through' }}>
{salePrice}
</span>
{' '}
<span>
{getPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
</span>
</>
) : (
getPrice(variant.priceV2.amount, variant.priceV2.currencyCode)
)}
</Heading>
</span>
{/* Correction: Safely handle the case where description may be undefined */}
<div dangerouslySetInnerHTML={{ __html: description || '' }} />
<div>
<Grid padding={2} columns={2}>
{colors && colors.length > 0 && (
  <OptionPicker
    key="Color"
    name="Color"
    options={colors}
    selected={color}
    onChange={(event) => setColor(event.target.value)}
  />
)}
{sizes && sizes.length > 0 && (
  <OptionPicker
    key="Size"
    name="Size"
    options={sizes}
    selected={size}
    onChange={(event) => setSize(event.target.value)}
  />
)}
</Grid>
</div>
<Button
name="add-to-cart"
disabled={loading}
sx={{ margin: 2, display: 'block' }}
onClick={addToCart}
>
Add to Cart {loading && '...'}
</Button>
</div>
</Grid>
</React.Fragment>
);
};

const ProductView: React.FC<{
product: string | ShopifyBuy.Product
renderSeo?: boolean
description?: string
title?: string
}> = ({ product, ...props }) => {
return (
<ProductLoader product={product}>
{(productObject) => <ProductBox {...props} product={productObject} />}
</ProductLoader>
)
}
export default ProductView