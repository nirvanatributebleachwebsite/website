import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import SEO from '../components/SEO'
import Socials from '../components/Socials'
import '../../assets/css/styles.scss';

export const META_QUERY = graphql`
query META_QUERY {
  meta: allContentfulMeta(sort: {order: DESC, fields: updatedAt}, limit: 1) {
    edges {
      node {
        backgroundImage {
          fluid(maxHeight: 1080, maxWidth: 1920) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        socials
        descriptionLong {
          childMarkdownRemark {
            html
          }
        }
        descriptionShort
        name
      }
    }
  }
}
`;

const Wrapper = ({children}) => (
  <StaticQuery
    query={META_QUERY}
    render={({meta}) => {

      const { name = null, descriptionShort = null, socials = null, backgroundImage = null } = meta.edges[0].node;

      const schemaObject = {
        '@context': 'http://schema.org',
        '@type': 'MusicGroup',
        name,
        foundingLocation: {
          '@type': 'City',
          name: 'Breda'
        },
        genre: 'Rock',
      }

      return (<>
        <SEO title={name} description={descriptionShort} socials={socials} />
        {/* background */}
        { backgroundImage && <Img fluid={backgroundImage.fluid} className="bg-image" /> }
        <div className="c-wrapper">
          <header>
            <h1>
              <Link to="/">
                <div className="u-sr-only">{ name || 'BLEACH' }</div>
                BLEACH
              </Link>
            </h1>
          </header>
          <main>{children}</main>
          <footer>
            { socials && <Socials socials={socials} />}
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaObject)}} />
          </footer>
        </div>
      </>)
    }}
  />
)

export default Wrapper
