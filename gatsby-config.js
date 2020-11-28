require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'production'}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  environment: process.env.CONTENTFUL_ENVIRONMENT
}

console.log(`----------------------\nenv: ${process.env.NODE_ENV || 'production'}\tspaceId: ${contentfulConfig.spaceId}\taccessToken: ${contentfulConfig.accessToken}\n----------------------`);


const {spaceId, accessToken} = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

const siteName = 'Nirvana tribute band BLEACH';

module.exports = {
  siteMetadata: {
    title: siteName,
    titleTemplate: `%s`,
    description: `${siteName} Nirvana tribute from Breda, The Netherlands`,
    url: 'nirvanatribute.nl',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: contentfulConfig.spaceId,
        accessToken: contentfulConfig.accessToken,
        environment: contentfulConfig.environment,
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 70,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-33304343-1",
      },
    },
  ],
}
