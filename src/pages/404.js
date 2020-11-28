import React from 'react'
import Link from 'gatsby-link'
import Wrapper from '../components/Wrapper'

const _404 = () => {
  return(<Wrapper>
    <p style={{textAlign: 'center', marginBottom: '3rem'}}>Deze pagina bestaat niet. <Link to="/">Ga terug naar de homepage.</Link></p>
    </Wrapper>)
}

export default _404
