import React from 'react'

export const ShowSchema = ({
  name,
  start,
  end,
  locationName,
  locationStreetAddress,
  locationPostalCode,
  locationCity,
  locationUrl,
  ticketPrice,
  ticketUrl,
  description,
}) => {
  // base object
  const schemaObject = {
    '@context': 'http://schema.org',
    '@type': 'MusicEvent',
    name,
    performer: {
      '@type': 'MusicGroup',
      name: 'BLEACH',
    },
    startDate: new Date(start).toISOString(),
    eventAttendanceMode: 'OfflineEventAttendanceMode',
    eventStatus: 'EventScheduled',
  };

  // description
  schemaObject.description = description && 'childMarkdownRemark' in description? description.childMarkdownRemark.excerpt : undefined;

  // add end
  if (end) {
    schemaObject.endDate = new Date(end).toISOString()
  }

  // location info
  if (locationName) {
    schemaObject.location = {
      '@type': 'Place',
      name: locationName,
      sameAs: locationUrl || undefined,
      address: (locationStreetAddress || locationPostalCode || locationCity)? {
        '@type': 'PostalAddress',
        streetAddress: locationStreetAddress || undefined,
        postalcode: locationPostalCode || undefined,
        addressLocality: locationCity || undefined,
      } : undefined,
    }
  }

  // tickets
  if (ticketUrl) {
    schemaObject.offers = {
      '@type': 'Offer',
      url: ticketUrl,
      priceCurrency: 'EUR',
      price: parseFloat(ticketPrice) || 0,
      availability: 'https://schema.org/InStock',
    }
  }

  return JSON.stringify(schemaObject);
}

const Show = ({
  name,
  start,
  end,
  locationName,
  locationStreetAddress,
  locationPostalCode,
  locationCity,
  locationUrl,
  ticketPrice,
  ticketUrl,
  description,
}) => {
  const dateOptions = {
    dateStyle: 'short',
    timeStyle: 'short',
  };
  return (
    <article className="c-show">
      <time dateTime={start} className="c-show__date">{ new Date(start).toLocaleString('nl', dateOptions) }</time>
      <h3 className="c-show__title">
        { ticketUrl && <a href={ticketUrl} className="c-show__link u-umbrella" target="_blank" rel="noopener noreferrer">{ name }</a> }
        { !ticketUrl && name }
      </h3>
      { locationName && locationName !== name && <div className="c-show__location">
        { locationUrl && <a href={locationUrl} target="_blank" rel="noopener noreferrer">{ [locationName, locationCity].filter(s => !!s).join(', ') }</a> }
        { !locationUrl && [locationName, locationCity].filter(s => !!s).join(', ') }
      </div> }
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: ShowSchema({
          name,
          start,
          end,
          locationName,
          locationStreetAddress,
          locationPostalCode,
          locationCity,
          locationUrl,
          ticketPrice,
          ticketUrl,
          description,
        })}} />
    </article>
  )
}

export default Show
