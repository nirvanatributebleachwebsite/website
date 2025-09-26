import React from 'react'
import { graphql } from 'gatsby'
import Show from '../components/Show'
import Video from '../components/Video'
import News from '../components/News'
import Wrapper from '../components/Wrapper'
// import PRESS_QUOTES from "../components/PressQuotes";

export const HOMEPAGE_QUERY = graphql`
query HOMEPAGE_QUERY {
  meta: allContentfulMeta(limit:1) {
    edges {
      node {
        descriptionLong {
          childMarkdownRemark {
            html
            excerpt(pruneLength: 512)
          }
        }
      }
    }
  }
  newsList: allContentfulNews(filter: {showOnHomePage: {eq: true}}, sort: {fields: displayDate, order: DESC}) {
    edges {
      node {
        title
        shortDescription {
          childMarkdownRemark {
            html
            excerpt(pruneLength: 512)
          }
        }
        showOnHomePage
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
  # pressQuoteItems: allContentfulPressQuotes {
  #   edges {
  #     node {
  #       quote {
  #         childMarkdownRemark {
  #           html
  #           excerpt(pruneLength: 512)
  #         }
  #       }
  #       quoteBy
  #       quoteUrl
  #       quoteLinkTitle
  #     }
  #   }
  # }  
  showList: allContentfulShows(
    limit: 30,
    sort: {fields: start, order: DESC} # FUTURE-FIRST window for perf; we’ll re-sort ASC for display
  ) {
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
  videoItems: allContentfulVideos(sort: {fields: sortingWeight, order: ASC}) {
    edges {
      node {
        title
        youtubeId
      }
    }
  }
}
`;

const Home = ({data:{showList, videoItems, newsList/*, pressQuoteItems*/, meta }}) => {
  // const pressQuotes = pressQuoteItems && pressQuoteItems.edges || false
  const news = newsList.edges.length && newsList.edges || false
  const videos = videoItems.edges || false

  // Pull a small DESC window (future-first), keep only future/ongoing, re-sort ASC, cap to 10.
  const now = Date.now();
  const shows = (showList?.edges || [])
    .filter(({ node }) => {
      const endTs = node.end ? Date.parse(node.end) : NaN;
      const startTs = node.start ? Date.parse(node.start) : NaN;
      // Keep multi-day shows until they end; otherwise keep shows that haven't started yet
      return (Number.isFinite(endTs) && endTs >= now) ||
        (Number.isFinite(startTs) && startTs >= now);
    })
    .sort((a, b) => Date.parse(a.node.start) - Date.parse(b.node.start)) // soonest → latest
    .slice(0, 10);

  return (<Wrapper>

    {/* News */}
    { news && <section className="c-news">
      <h2><a href={`/news`}>News</a></h2>
      <ul className="c-news__list">{
        news.map(({ node }) => {
          return(<li key={node.name}>
            <News {... node} />
          </li>)
        })
      }</ul>
    </section> }

    {/* Videos */}
    { videos && <section className="c-videos">
      <h2>Videos</h2>
      <ol className="c-videos__list">{
        videos.map(({ node }) => {
          return(<li className="c-videos__item" key={node.title}>
              <Video {... node} />
          </li>)
        })
      }</ol>
    </section> }

    {/*/!* Press quotes *!/*/}
    {/*{ pressQuotes && <PRESS_QUOTES pressQuotes={pressQuotes} /> }*/}

    <section>
      <h2>About</h2>
      <div dangerouslySetInnerHTML={{__html: meta.edges[0].node.descriptionLong.childMarkdownRemark.html}}></div>
    </section>
    <section>
      <h2>Contact / Bookings</h2>
      <p><strong>Ferdi Wels</strong><br />
      Tel: +31 (0)6 1920 0975<br />
      E-mail: <a href="mailto:info@nirvanatribute.nl">info@nirvanatribute.nl</a></p>
    </section>

    {/* Shows */}
    { shows && shows.length > 0 && <section className="c-shows">
      <h2><a href={`/shows`}>Shows</a></h2>
      <ol className="c-shows__list">{
        shows.map(({ node }) => {
          return(<li className="c-shows__item" key={`${node.name}-${node.start}`}>
            <Show {... node} />
          </li>)
        })
      }</ol>
    </section> }

  </Wrapper>)
};

export default Home
