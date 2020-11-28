import React from 'react'
import Img from 'gatsby-image'

export const NewsSchema = (props) => {
  const {
    title,
    shortDescription,
    showOnHomePage,
    displayDate,
    images,
    readMoreUrl
  } = props

  const shortDescriptionText = shortDescription && 'childMarkdownRemark' in shortDescription
    ? shortDescription.childMarkdownRemark.excerpt
    : undefined;

  const schemaObject = {
    '@context': 'https://schema.org/',
    '@type': 'BlogPosting',
    headline: title,
    image: images && images.map(({ fixed: {src} }) => src).join(', ') || undefined,
    articleBody: shortDescriptionText,
    datePublished: displayDate,
    dateCreated: displayDate,
    url: readMoreUrl,
  };
  return JSON.stringify(schemaObject);
}

const News = (props) => {
  const {
    title,
    shortDescription,
    showOnHomePage,
    displayDate,
    images,
    readMoreUrl
  } = props

  const mainImage = images && images[0].fluid || false
  const shortDescriptionText = shortDescription && 'childMarkdownRemark' in shortDescription
    ? shortDescription.childMarkdownRemark.html
    : undefined;

  return (<article className={`c-news__item${ mainImage? ' c-news__item--has-image' : '' }`}>
    { mainImage && <Img fluid={mainImage} alt={title} className="c-news__image"/> }
    <div className="c-news__text">
      <h3 className="c-news__title">{title}</h3>
      { shortDescriptionText && <div dangerouslySetInnerHTML={{ __html: shortDescriptionText }}></div> }
      { title === 'BLEACH wint 3FM Kurt Cobain Reïncarnatiecontest' && <p><iframe frameBorder="no" height="70" scrolling="no" src="http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F62915790&amp;auto_play=false&amp;show_artwork=false&amp;color=ff7700" width="340"></iframe> <br /><iframe frameBorder="no" height="70" scrolling="no" src="http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F62915791&amp;auto_play=false&amp;show_artwork=false&amp;color=ff7700" width="340"></iframe></p>}
      <div className="c-news__order">
        { !!readMoreUrl && <div className="c-news__button-container"><a href={readMoreUrl} target="_blank" className="c-news__button">Read more</a></div> }
      </div>
    </div>

    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: NewsSchema(props)}} />
  </article>)
}

export default News
