import React from 'react'
import PressQuote from "./PressQuote";

const PRESS_QUOTES = ({
   pressQuotes,
}) => {
  if (!pressQuotes.length) return null;
  return (
    <section className="c-press-quotes">
      <h2>Press quotes</h2>
      { pressQuotes.map((pressQuote, index) => <PressQuote pressQuote={pressQuote.node} key={index} />) }
    </section>
  )
}

export default PRESS_QUOTES
