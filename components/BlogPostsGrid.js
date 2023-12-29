import React from 'react';
import Link from 'next/link';

const BlogPostsGrid = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={post.image} alt={post.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{post.title}</div>
            <p className="text-gray-700 text-base">{post.blurb}</p>
            <Link href={`/blog/${post.handle}`}><a>Read more</a></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPostsGrid;
