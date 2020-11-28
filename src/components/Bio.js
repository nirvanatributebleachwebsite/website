import React from 'react'

const BIO = ({
   bioLongNl,
   bioMediumNl,
   bioShortNl,
   bioLongEn,
   bioMediumEn,
   bioShortEn,
}) => {

  const bioLongNlText = bioLongNl && 'childMarkdownRemark' in bioLongNl? bioLongNl.childMarkdownRemark.html : undefined;
  const bioMediumNlText = bioMediumNl && 'childMarkdownRemark' in bioMediumNl? bioMediumNl.childMarkdownRemark.html : undefined;
  const bioShortNlText = bioShortNl && 'childMarkdownRemark' in bioShortNl? bioShortNl.childMarkdownRemark.html : undefined;
  const bioLongEnText = bioLongEn && 'childMarkdownRemark' in bioLongEn? bioLongEn.childMarkdownRemark.html : undefined;
  const bioMediumEnText = bioMediumEn && 'childMarkdownRemark' in bioMediumEn? bioMediumEn.childMarkdownRemark.html : undefined;
  const bioShortEnText = bioShortEn && 'childMarkdownRemark' in bioShortEn? bioShortEn.childMarkdownRemark.html : undefined;

  return (
        <section className="c-bio">
          <h2>BIO</h2>
          { bioLongEnText && bioLongEnText !== '<p>Coming soon</p>' && <h3>Long (EN)</h3>}
          { bioLongEnText && bioLongEnText !== '<p>Coming soon</p>n' && <div dangerouslySetInnerHTML={{__html: bioLongEnText}}></div>}
          { bioMediumEnText && bioMediumEnText !== '<p>Coming soon</p>' && <h3>Medium (EN)</h3>}
          { bioMediumEnText && bioMediumEnText !== '<p>Coming soon</p>' && <div dangerouslySetInnerHTML={{ __html: bioMediumEnText }}></div> }
          { bioShortEnText && bioShortEnText !== '<p>Coming soon</p>' && <h3>Short (EN)</h3>}
          { bioShortEnText && bioShortEnText !== '<p>Coming soon</p>'  && <div dangerouslySetInnerHTML={{ __html: bioShortEnText }}></div> }
          { bioLongNlText && bioLongNlText !== '<p>Coming soon</p>' && <h3>Long (NL)</h3>}
          { bioLongNlText && bioLongNlText !== '<p>Coming soon</p>' && <div dangerouslySetInnerHTML={{ __html: bioLongNlText }}></div> }
          { bioMediumNlText && bioMediumNlText !== '<p>Coming soon</p>' && <h3>Medium (NL)</h3>}
          { bioMediumNlText && bioMediumNlText !== '<p>Coming soon</p>' && <div dangerouslySetInnerHTML={{ __html: bioMediumNlText }}></div> }
          { bioShortNlText && bioShortNlText !== '<p>Coming soon</p>' && <h3>Short (NL)</h3>}
          { bioShortNlText && bioShortNlText !== '<p>Coming soon</p>' && <div dangerouslySetInnerHTML={{ __html: bioShortNlText }}></div> }
        </section>
    )
}

export default BIO
