import React from 'react'

export const VideoSchema = (props) => {
    const {
        title,
        youtubeId
    } = props

    const schemaObject = {
        '@context': 'https://schema.org/',
        '@type': 'VideoObject',
        name: title,
        embedUrl: 'https://www.youtube.com/embed/' + youtubeId,
        musicBy: 'BLEACH',
    };
    return JSON.stringify(schemaObject);
}

const Video = ({
    title,
    youtubeId,
}) => {
    return (
        <article className="c-video">
            <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                className="video"
                allowFullScreen>
            </iframe>
        </article>
    )
}

export default Video
