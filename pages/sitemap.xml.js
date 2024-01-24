// pages/sitemap.xml.js
const BUILDER_IO_API_KEY = '6072e6c1f08c4d4486723e2017e1b62e'; // Replace with your actual Builder.io API key.
const BUILDER_IO_CONTENT_URL = `https://cdn.builder.io/api/v2/content/page?apiKey=${BUILDER_IO_API_KEY}&fields=data.url`;

function generateSiteMap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Manually set URLs (add your own URLs here) -->
      <url>
        <loc>https://untamedbynature.com</loc>
      </url>
      ${pages
        .map(page => {
          return `
          <url>
            <loc>https://untamedbynature.com${page.data.url}</loc>
          </url>
        `;
        })
        .join('')}
    </urlset>
  `;
}

function SiteMap() {
  // This page does not render anything.
  return null;
}

export async function getServerSideProps({ res }) {
  // Make an API call to gather the URLs for our site
  const request = await fetch(BUILDER_IO_CONTENT_URL);
  const response = await request.json();
  const pages = response.results; // Adjust based on the actual response structure

  // Generate the XML sitemap with the pages data
  const sitemap = generateSiteMap(pages);

  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
