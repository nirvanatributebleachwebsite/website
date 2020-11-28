import React from 'react'
import Facebook from '../../assets/svg/facebook.svg';
import Instagram from '../../assets/svg/instagram.svg';
import YouTube from '../../assets/svg/youtube.svg';

const linkAttrs = {
  facebook: {
    className: 'facebook',
    logo: Facebook,
    text: 'BLEACH on Facebook',
  },
  instagram: {
    className: 'instagram',
    logo: Instagram,
    text: 'BLEACH on Instagram',
  },
  youtube: {
    className: 'youtube',
    logo: YouTube,
    text: 'BLEACH on YouTube',
  },
}

const getLinkAttrs = url => linkAttrs[Object.keys(linkAttrs).find(platform => url.includes(platform))] || null

const Socials = ({socials}) => {
  return <ul className="c-socials">
    { socials.map(url => {
      console.log(url);

      const linkAttrs = getLinkAttrs(url);
      if (!linkAttrs) return;
      const {className, logo: Logo, text} = getLinkAttrs(url);
      if(!className || !Logo || !text) return null;
      return <li className="c-socials__item" key={url}>
        <a href={url} target="_blank" className="c-button c-button--round">
          <Logo className={`c-button__icon c-button__icon--${className}`} />
          <span className='u-sr-only'>{ text }</span>
        </a>
      </li>
    }) }
  </ul>
}

export default Socials
