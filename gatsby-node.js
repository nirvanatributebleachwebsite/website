exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday = yesterday.toISOString();

  createPage({
    ...page,
    context: {
      ...page.context,
      yesterday: yesterday,
    },
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    # meta
    type ContentfulMeta implements Node {
      name: String
      descriptionShort: String
      socials: [String]
      descriptionLong: contentfulMetaDescriptionLongTextNode
      backgroundImage: ContentfulAsset
      socialImage: ContentfulAsset
    }

    # releases
    # type ContentfulReleases implements Node {
    #   title: String
    #   releaseDate: Date
    #   streamingURLs: [String]
    #   images: [ContentfulAsset]
    #   relatedMerch: [ContentfulMerch]
    #   tracks: contentfulReleasesTracksTextNode
    #   childContentfulReleasesTracksTextNode: contentfulReleasesTracksTextNode
    #   showTitleOnHomepage: Boolean
    # }

    # merch
    # type ContentfulMerch implements Node {
    #   name: String
    #   price: Float
    #   url: String
    #   releases: [ContentfulReleases]
    #   description: contentfulMerchDescriptionTextNode
    #   sizes: [String]
    #   images: [ContentfulAsset]
    #   sortingWeight: Int
    # }
    
    # EPK
    type ContentfulEpk implements Node {
      bioLongNl: contentfulEpkBioLongNlTextNode
      bioMediumNl: contentfulEpkBioMediumNlTextNode
      bioShortNl: contentfulEpkBioShortNlTextNode
      bioLongEn: contentfulEpkBioLongEnTextNode
      bioMediumEn: contentfulEpkBioMediumEnTextNode
      bioShortEn: contentfulEpkBioShortEnTextNode
      contactInfo: contentfulEpkContactInfoTextNode
      bandPhotos: [ContentfulAsset]
      logos: [ContentfulAsset]
    }

    # Press quotes
    # type ContentfulPressQuotes implements Node {
    #   quote: contentfulPressQuotesQuoteTextNode
    #   quoteBy: String
    #   quoteUrl: String
    #   quoteLinkTitle: String
    #}
    
    # Concert reviews
    # type ContentfulConcertReviews implements Node @dontInfer {
    #   review: contentfulConcertReviewsReviewTextNode || false
    #   reviewBy: String
    #   reviewUrl: String
    #   reviewLinkTitle: String
    # }
    
    #shows
    type ContentfulShows implements Node {
      name: String
      description: contentfulShowsDescriptionTextNode
      start: Date
      end: Date
      locationName: String
      locationStreetAddress: String
      locationPostalCode: String
      locationCity: String
      locationUrl: String
      ticketPrice: Float
      ticketUrl: String
    }
  `
  createTypes(typeDefs)
}
