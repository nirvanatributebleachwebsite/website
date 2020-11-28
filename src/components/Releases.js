import React from 'react';
import Release, { ReleaseSchema } from './Release'

const Releases = ({releases, showTitle}) => {
  if (!releases.length) return null;
  return (
    <section className="c-releases">
      { showTitle ? <h2>Releases</h2>: ''}
      { releases.map((release, index) => <Release release={release.node} key={index} />) }
    </section>
  )
}

export default Releases
