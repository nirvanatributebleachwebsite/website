import React from 'react'

const CONCERT_REVIEW = ({ concertReview:{
   review,
   reviewBy,
   reviewUrl,
   reviewLinkTitle,
}}) => {

  const reviewText = review && 'childMarkdownRemark' in review ? review.childMarkdownRemark.html : undefined;

  return (
        <article className="c-press-quote">
          <h3>{ reviewText && <div dangerouslySetInnerHTML={{ __html: reviewText}}></div> }</h3>
          <p>{ reviewBy } { reviewUrl ? <a target="_blank" href={reviewUrl}>{reviewLinkTitle ? reviewLinkTitle : 'Full article'}</a> : null}</p>
        </article>
    )
}

export default CONCERT_REVIEW
