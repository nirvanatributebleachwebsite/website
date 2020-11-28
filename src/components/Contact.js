import React from 'react'

const CONTACT = ({
   contactInfo,
}) => {
  const contactInfoText = contactInfo && 'childMarkdownRemark' in contactInfo? contactInfo.childMarkdownRemark.html : undefined;

  return (
        <section className="c-contact-info">
          <h2>Contact</h2>
          { contactInfoText && <div dangerouslySetInnerHTML={{ __html: contactInfoText }}></div> }
        </section>
    )
}

export default CONTACT
