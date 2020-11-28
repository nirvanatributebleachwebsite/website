import React from 'react'
import Img from "gatsby-image";

const BANDPHOTOS = ({
  bandPhotos,
}) => {
  return (
        <section className="c-bandphotos">
          <h2>Band photos</h2>
          <ol className="c-videos__list">
          { bandPhotos.map(({ fluid, file }, index) => {
            return(<li key={index}><a title={'Click for original'} className={'c-bandphoto-link'} href={file.url} target={'_blank'}>
              <Img fluid={fluid} className="c-release__image"/>
            </a></li>)
            })
          }
          </ol>
        </section>
    )
}

export default BANDPHOTOS
