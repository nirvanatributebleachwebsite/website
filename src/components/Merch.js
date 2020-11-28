import React from 'react'
import Img from 'gatsby-image'

export const MerchSchema = (props) => {
  const {
    name,
    description,
    images,
    price,
    url
  } = props

  const descriptionText = description && 'childMarkdownRemark' in description? description.childMarkdownRemark.excerpt : undefined;

  const schemaObject = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name,
    image: images && images.map(({ fixed: {src} }) => src).join(', ') || undefined,
    description: descriptionText,
    brand: 'BLEACH',
    offers: {
      priceCurrency: 'EUR',
      price: parseFloat(price) || 0,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      url,
      availability: 'https://schema.org/InStock',
    },
  };
  return JSON.stringify(schemaObject);
}

const Merch = (props) => {
  const {
    name,
    description,
    images,
    sizes,
    price,
    url
  } = props

  const mainImage = images && images[0].fluid || false
  const descriptionText = description && 'childMarkdownRemark' in description? description.childMarkdownRemark.html : undefined;

  return (<article className={`c-merch__item${ mainImage? ' c-merch__item--has-image' : '' }`}>
    { mainImage && <Img fluid={mainImage} alt={name} className="c-merch__image"/> }
    <div className="c-merch__text">
      <h3 className="c-merch__title">{name}</h3>
      { descriptionText && <div dangerouslySetInnerHTML={{ __html: descriptionText }}></div> }
      { sizes && <p>Verkrijgbaar in { sizes.map((size, index) => {
      let output = size.toUpperCase();
        if(index < sizes.length - 2) output += ', ';
        if(index === sizes.length - 2) output += ' en ';
        return output
      }).join('') }</p> }
      <div className="c-merch__order">
        { typeof price === 'number' && <div className="c-merch__price">{new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(price)}</div>}
        { !!url && <div className="c-merch__button-container"><a href={url} target="_blank" className="c-merch__button">Bestel nu <span className="u-sr-only">{ name } van BLEACH</span></a></div> }
      </div>
    </div>

    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: MerchSchema(props)}} />
  </article>)
}

export default Merch
