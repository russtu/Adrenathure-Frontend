import useFetch from 'fetch-suspense'
import { Suspense } from 'react'
import { Link } from "react-router-dom"
import Loading from '../Loading'
import './Footer.css'
const BASE_URL  = process.env.REACT_APP_URL


function Footer() {
  const experiences = useFetch(`${BASE_URL}/experiences`)
  const placeId = useFetch(`${BASE_URL}/places/`)
  const update = new Date().getFullYear()
  return (
    <div className='footer'>
      <div className='headerFooter'>
        <h2 id='footerHeader'>
          <Link to="/" className='footerLinks'>adrenathure</Link>
        </h2>
        <section className="bodyFooter">
          <article className='footerNavLinks'>
            <div id='footerExperiences'>
              <Link to="/experiences#experiences" className='footerLinks'>experiencias</Link>
              <div key={experiences.id} className='footerList'>
                {experiences.map(experience =>
                  <Link key={experience.id} to={`/experiences/${experience.id}#experienceId`} className='footerList'>
                    {experience.experienceName}
                  </Link>)}
              </div>
            </div>
            <div id='footerPlaces'>
              <Link to="/places#places" className='footerLinks'>destinos</Link>
              <div className="footerList">
                {placeId.map(place =>
                  <Link key={place.id} to={`/places/${place.id}#placeId`} className='footerList'>
                    {place.placeName}
                  </Link>)}
              </div>
            </div>
            {/* <div id='footerAbout'>
              <Link to="/about#portada-body" className='footerLinks'>sobre nosotros</Link>
            </div> */}
            <div id='footerContact'>
              {/* <Link to="/contact#contact" className='footerLinks'>contacto</Link> */}
              <div className='footerEmail'>
                <div><a href='mailto:adrenathure.info@gmail.com?subject=Consulta Experiencias' className='footerList' target='_blank' rel="noreferrer">✉adrenathure.info@gmail.com</a></div>
                  {/* <img id='email' src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/64/000000/external-email-customer-service-xnimrodx-blue-xnimrodx-2.png" alt="email" /> */}
                <div className='footerList'><img id='phone' src="https://img.icons8.com/emoji/48/000000/telephone.png" alt="teléfono" />986 123 456</div>
                <div className='footerList' id='address'>🏡<br />Avda. de García Barbón, 27<br />36201Vigo (Pontevedra)
                  {/* <img src="https://img.icons8.com/office/16/000000/building.png" alt="office" />Avda. de García Barbón, 27<br />36201Vigo (Pontevedra) */}
                </div>
              </div>
            </div>
            <div id='footerLegal'>
              {/* <Link to="/terminosYCondiciones#terminos" target='_blank' rel="noreferrer" className='footerLinks'>términos legales</Link> */}
              <div className='footerLegal'>
                <div><Link to="/terminosYCondiciones#terminos" target='_blank' rel="noreferrer" className='footerLinks'>términos y condiciones</Link></div>
                <div><Link to="/politicaDePrivacidad#privacidad" target='_blank' rel="noreferrer" className='footerLinks'>política de privacidad</Link></div>
                <div><Link to="/politicaDeCookies#cookies" target='_blank' rel="noreferrer" className='footerLinks'>política de cookies</Link></div>
              </div>
            </div>
          </article>
        </section>
        <section id='footerSocialMedia'>
          <a className='socialMedia' href='http://www.twitter.com' target='_blank' rel="noreferrer"><img src="https://global-uploads.webflow.com/5f3108520188e7588ef687b1/5f58a208666f7b5d1a711143_twitter-circular-logo.svg" alt="logo twitter" className="rrss-selector" /></a>
          <a className='socialMedia' href='http://www.instagram.com' target='_blank' rel="noreferrer"><img src="https://global-uploads.webflow.com/5f3108520188e7588ef687b1/5f58a21b3b98e1679a71fb14_instagram-circular-logo.svg" alt="logo instagram" className="rrss-selector" /></a>
          <a className='socialMedia' href='http://www.facebook.com' target='_blank' rel="noreferrer"><img src="https://global-uploads.webflow.com/5f3108520188e7588ef687b1/5f58a2361e897958db045d2e_facebook-circular-logo.svg" alt="logo facebook" className="rrss-selector" /></a>
          <a className='socialMedia' href='http://www.linkedin.com' target='_blank' rel="noreferrer"><img src="https://global-uploads.webflow.com/5f3108520188e7588ef687b1/5f58a2299a0e417966e9013d_linkedin-circular-logo.svg" alt="logo linkedin" className="rrss-selector" /></a>
        </section>
      </div>
      <section className='footerEquipment'>
        <div className='footerList'>&copy; Adrenathure 2022 - {update}</div>
        <div className='footerList'>Hecho con 💪 por Zuzana, Rubén, Carlos y Manuel de JSB08VI</div>
      </section>
    </div>
  )

}

const FooterWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <Footer />
  </Suspense>

export default FooterWrapper
