import React from 'react'

const PRESS_QUOTE = ({ pressQuote:{
   quote,
   quoteBy,
   quoteUrl,
   quoteLinkTitle,
}}) => {

  const quoteText = quote && 'childMarkdownRemark' in quote ? quote.childMarkdownRemark.html : undefined;

  return (
        <article className="c-press-quote">
          <h3>{ quoteText && <div dangerouslySetInnerHTML={{ __html: quoteText}}></div> }</h3>
          <p>{ quoteBy } { quoteUrl ? <a target="_blank" href={quoteUrl}>{quoteLinkTitle ? quoteLinkTitle : 'Link'}</a> : null}</p>
        </article>
    )
}

export default PRESS_QUOTE
