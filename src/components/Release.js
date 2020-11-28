import React from 'react'
import Img from 'gatsby-image'
import Deezer from '../../assets/svg/deezer.svg'
import Tidal from '../../assets/svg/tidal.svg'
import Spotify from '../../assets/svg/spotify.svg'

const streamingPlatforms = [
  'Spotify',
  'Tidal',
  'Deezer',
];

export const ReleaseSchema = ({
  title,
  streamingURLs,
  releaseDate,
  images,
  relatedMerch,
  tracks,
}) => {
  // base object
  const schemaObject = {
    '@context': 'http://schema.org',
    '@type': 'MusicAlbum',
    name: title,
    byArtist: {
      '@type': 'MusicGroup',
      name: 'BLEACH',
    }
  };

  // add release date
  if (releaseDate) {
    schemaObject.datePublished = releaseDate;
  }

  // add images
  if (images.length) {
    schemaObject.image = images.map(({fluid: {src}}) => src);
  }

  // add (streaming) URLS
  if (streamingURLs && streamingURLs.length) {
    schemaObject.url = streamingURLs
  }

  // generate tracklist
  if (tracks && tracks.tracks.length) {
    const trackList = tracks.tracks.split('\n').filter(entry => entry.trim() !== '')
    const numberOfItems = trackList.length

    if (numberOfItems) {
      schemaObject.track = {
        '@type': 'ItemList',
        numberOfItems,
        itemListElement: trackList.map((name, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'MusicRecording',
            name,
          }
        }))
      }
    }
    // add related merch items
    if (relatedMerch && relatedMerch.length) {
      schemaObject.offers = relatedMerch.map(({ url, sizes, price, name, description, images }) => {
        const descriptionText = description && 'childMarkdownRemark' in description? description.childMarkdownRemark.excerpt : undefined;
        return {
          '@type': 'Offer',
          url,
          price: parseFloat(price) || 0,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          name,
          description: descriptionText,
          image: (images && images.length)? images.map(({ fixed: { src } }) => src ) : undefined,
        }
      });
    }
  }

  // convert to JSON
  return JSON.stringify(schemaObject);
}

const PlatformIcon = ({platform}) => {
  const className = `c-button__icon c-button__icon--${platform.toLowerCase()}`;
  return (
    <>
    { platform === 'Deezer' && <Deezer className={className} />}
    { platform === 'Tidal' && <Tidal className={className} />}
    { platform === 'Spotify' && <Spotify className={className} />}
    </>
  )
}

const Release = ({ release:{
  title,
  showTitleOnHomepage,
  streamingURLs,
  releaseDate,
  images,
  relatedMerch,
  tracks,
}}) => {
  const mainImage = images[0].fluid || false
  const allowedPlatformTest = new RegExp(`(${streamingPlatforms.join('|')})`, 'i')
  const streamingLinks = streamingURLs && streamingURLs.filter(url => allowedPlatformTest.test(url))
  const relatedMerchWithLinks = relatedMerch && relatedMerch.filter(merch => !!merch.url) || false
  const hideTitle = typeof showTitleOnHomepage !== 'undefined' && showTitleOnHomepage === false

  return (
  <article className="c-release">
    { mainImage && <Img fluid={mainImage} alt={title} className="c-release__image"/> }
    <h2 className={`c-release__title${hideTitle? ' u-sr-only':''}`}>{title}</h2>
    { streamingLinks && <div className="c-release__platforms">
      <h3 className="c-release__platforms-title u-sr-only">Luister nu:</h3>
      <ul className="c-release__platform-list">
        { streamingLinks.map(link => {
          const platform = streamingPlatforms.find(platform => link.toLowerCase().includes(platform.toLowerCase()));
          if (!platform) return null;
          const linkText = `Luister ${title} op ${platform}`;
          return (<li key={link} className="c-release__platform-item">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="c-button c-button--round"
              >
                <PlatformIcon platform={platform} />
                <span className="u-sr-only">{linkText}</span>
              </a>
            </li>)

        }) }
      </ul>
    </div> }
    { relatedMerchWithLinks && !!relatedMerchWithLinks.length && <div className="c-release__merch">
      <h3 className="c-release__merch-title">Koop nu:</h3>
      <ul className="c-release__merch-list">
        {
          relatedMerchWithLinks.map(({
            url,
            name,
          }) => {
            return(<li key={name} className="c-release__merch-item">
              <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
            </li>)
          })
        }
      </ul>
    </div> }
    <script type="application/ld+json"  dangerouslySetInnerHTML={{__html: ReleaseSchema({
        title,
        streamingURLs,
        releaseDate,
        images,
        relatedMerch,
        tracks,
      })}} />
  </article>
  )
}

export default Release
