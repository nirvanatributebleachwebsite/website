import React from 'react'
import { graphql } from 'gatsby'

import News from '../components/News'

import Wrapper from '../components/Wrapper'

export const NEWS_QUERY = graphql`
query NEWS_QUERY {
  newsList: allContentfulNews(sort: {fields: displayDate, order: DESC}) {
    edges {
      node {
        title
        shortDescription {
          childMarkdownRemark {
            html
            excerpt(pruneLength: 512)
          }
        }
        displayDate
        images {
          fluid(maxWidth: 380) {
            ...GatsbyContentfulFluid_withWebp
          }
          fixed(width: 320) {
            ...GatsbyContentfulFixed_withWebp
          }
        }
      }
    }
  }
}
`;

const Home = ({data:{newsList, meta }}) => {
  const news = newsList.edges.length && newsList.edges || false

  return (<Wrapper>

    {/* News */}
    { news && <section className="c-news">
      <h2>News</h2>
      <ul className="c-news__list">{
        news.map(({ node }) => {
          return(<li key={node.name}>
            <News {... node} />
          </li>)
        })
      }</ul>
    </section> }

  </Wrapper>)
};

export default Home
