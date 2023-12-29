import { builder, BuilderComponent } from "@builder.io/react";
import React from 'react';

builder.init('6072e6c1f08c4d4486723e2017e1b62e');

function BlogList({ blogList }) {
  return (
    <BuilderComponent model="blog-list" content={blogList} />
  );
}

export async function getStaticProps() {
  const blogList = await builder.get('blog-list').promise();
  
  return {
    props: {
      blogList: blogList || null,
    },
    revalidate: 5, // In seconds
  };
}

export default BlogList;
