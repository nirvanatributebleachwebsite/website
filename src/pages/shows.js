import React from 'react'
import {graphql} from 'gatsby'
import Show from '../components/Show'
import Wrapper from '../components/Wrapper'

export const SHOWS_QUERY = graphql`
query SHOWS_QUERY {
  showList: allContentfulShows(sort: {fields: start, order: DESC}) {
    edges {
      node {
        ticketPrice
        ticketUrl
        name
        locationUrl
        locationStreetAddress
        locationPostalCode
        locationName
        end
        start
        locationCity
        description {
          childMarkdownRemark {
            excerpt(pruneLength: 512)
          }
        }
      }
    }
  }
}
`;

const Home = ({data: {showList, meta}}) => {
  const shows = showList.edges.length && showList.edges || false

  return (<Wrapper>

    {/* News */}
    {shows && <section className="show">
      <h2>Shows</h2>
      <ul className="c-shows__list">{
        shows.map(({node}) => {
          return (<li key={node.name}>
            <Show {...node} />
          </li>)
        })
      }</ul>
    </section>}

  </Wrapper>)
};

export default Home
