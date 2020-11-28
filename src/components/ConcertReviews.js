import React from 'react'
import CONCERT_REVIEW from "./ConcertReview";

const CONCERT_REVIEWS = ({
   concertReviews,
}) => {
  if (!concertReviews.length) return null;
  return (
    <section className="c-press-quotes">
      <h2>Concert reviews</h2>
      { concertReviews.map((concertReview, index) => <CONCERT_REVIEW concertReview={concertReview.node} key={index} />) }
    </section>
  )
}

export default CONCERT_REVIEWS
