import { builder, BuilderComponent, useIsPreviewing } from '@builder.io/react';
import React from 'react';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';

builder.init('6072e6c1f08c4d4486723e2017e1b62e');

function BlogArticle({ article }) {
  const isPreviewing = useIsPreviewing();
  if (!article && !isPreviewing) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  // If article data is available, render the BuilderComponent with the article content.
  // Otherwise, display a loading state or null.
  return article ? (
    <React.Fragment>
      <Head>
        <title>{article?.title}</title>
        <meta name="description" content={article?.blurb} />
        <meta property="og:image" content={article?.image} />
      </Head>
      {/* The BuilderComponent renders the content, including the title */}
      <BuilderComponent model="blog-article" content={article} />
    </React.Fragment>
  ) : null;  // You can replace this with a loading spinner if you like
}

export async function getStaticProps({ params }) {
  const article = await builder
    .get('blog-article', {
      options: { includeRefs: true },
      query: { 'data.handle': params.handle },
    })
    .promise() || null;

  return {
    props: { article },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default BlogArticle;
