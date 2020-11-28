import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, titleTemplate, description, image, pathname, socials }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          siteUrl,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || undefined,
        url: `${siteUrl}${pathname || "/"}`,
      }

      const schemaObject = {
        '@context': 'http://schema.org',
        '@type': 'MusicGroup',
        name: seo.title,
        description: seo.description,
        sameAs: socials || undefined,
      }

      return (
        <>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaObject) }}/>
            <link rel="apple-touch-icon" sizes="180x180" href="assets/favicons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="assets/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="assets/favicons/favicon-16x16.png" />
            <link rel="manifest" href="assets/favicons/site.webmanifest" />
            <link rel="mask-icon" href="assets/favicons/safari-pinned-tab.svg" color="#a8241b" />
            <link rel="shortcut icon" href="assets/favicons/favicon.ico" />
            <meta name="apple-mobile-web-app-title" content="BLEACH - NIRVANA TRIBUTE" />
            <meta name="application-name" content="BLEACH - NIRVANA TRIBUTE" />
            <meta name="msapplication-TileColor" content="#a8241b" />
            <meta name="msapplication-config" content="assets/favicons/browserconfig.xml" />
            <meta name="theme-color" content="#000000" />
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  socials: PropTypes.arrayOf(PropTypes.string),
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
  socials: []
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        siteUrl: url
      }
    }
  }
`
