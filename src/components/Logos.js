import React from 'react'
import Img from "gatsby-image";

const LOGOS = ({
  logos,
}) => {
  return (
        <section className="c-logos">
          <h2>Logos</h2>
          <ol className="c-videos__list">
          { logos.map(({ fluid, file }, index) => {
            return(<li key={index}><a title={'Click for original'} className={'c-logo-link'} href={file.url} target={'_blank'}>
              <Img fluid={fluid} className="c-release__image"/>
            </a></li>)
            })
          }
          </ol>
        </section>
    )
}

export default LOGOS
