import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'

const Head: FC<{ seoInfo: any }> = (props) => {
  return (
    <>
      <DefaultSeo {...props.seoInfo} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <link
  rel="icon"
  type="image/svg+xml"
  href="https://cdn.builder.io/api/v1/image/assets%2F6072e6c1f08c4d4486723e2017e1b62e%2F344375df42794459a8a1febee50a0110"
/>

      </NextHead>
    </>
  )
}

export default Head
