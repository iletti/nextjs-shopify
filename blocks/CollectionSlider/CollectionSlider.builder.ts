// blocks/CollectionSlider.builder.ts
import { Builder } from '@builder.io/react';
import dynamic from 'next/dynamic';


// Define the interface for props if you have complex types, otherwise, this is optional
// If you have a custom type for the product or collection, import that type here as well
interface CollectionSliderProps {
  collectionHandle: string;
}

// Use dynamic import with SSR set to false to only render this component client-side
const LazyCollectionSlider = dynamic(
    () => import(`components/CollectionSlider`),
    { ssr: true }
  )
  

Builder.registerComponent(LazyCollectionSlider, {
  name: 'CollectionSlider', // Name of the component in the Builder.io editor
  inputs: [
    {
      name: 'collectionHandle', // The prop name that will be used by the CollectionSlider component
      type: 'text', // The type of input, which in this case is a text input
      required: true, // Indicates that this field is required
      defaultValue: '', // Default value for the input
      helperText: 'Enter the handle of the Shopify collection you want to display.',
    },
    // Add other inputs as necessary
  ],
  models: ['page', 'product-page', 'collection-page'], // Example model names
  defaults: {
    bindings: {
      'component.options.collectionHandle': 'state.collectionHandle',
    },
  },
});
