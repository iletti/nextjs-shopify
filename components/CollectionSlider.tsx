// components/CollectionSlider.tsx
import React, { FC, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { getCollection } from '@lib/shopify/storefront-data-hooks/src/api/operations';
import shopifyConfig from '@config/shopify';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '@components/common/ProductCard';

interface CollectionSliderProps {
  collectionHandle: string; // The handle of the Shopify collection
}

const CollectionSlider: FC<CollectionSliderProps> = ({ collectionHandle }) => {
  const [products, setProducts] = useState<ShopifyBuy.Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const result = await getCollection(shopifyConfig, { handle: collectionHandle });
        setProducts(result.products);
      } catch (error) {
        console.error('Error fetching collection:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionHandle]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <ProductCard 
          key={product.id.toString()}
          product={product}
          imgWidth={300}
          imgHeight={300}
        />
      ))}
    </Slider>
  );
};

export default CollectionSlider;
