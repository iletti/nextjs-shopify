import { Builder } from '@builder.io/react';
import dynamic from 'next/dynamic';

const BlogPostsGrid = dynamic(() => import('./components/BlogPostsGrid'), { ssr: false });

Builder.registerComponent(BlogPostsGrid, {
  name: 'BlogPostsGrid',
  inputs: [
    {
      name: 'posts',
      type: 'list',
      subFields: [
        { name: 'title', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'blurb', type: 'string' },
        { name: 'handle', type: 'string' }
      ],
      defaultValue: []
    }
  ],
});
