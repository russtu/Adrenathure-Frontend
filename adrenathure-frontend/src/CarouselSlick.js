import React, { Suspense } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './Header.css'
import Loading from "./Loading"
import ErrorBoundary from "./ErrorBoundary"


function CarouselSlick() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
        <Slider autoplay adaptiveHeight {...settings}>
        <div>
          <img className='fotitos' src={'https://drive.google.com/uc?export=view&id=1SLiULbV_ymNPjlCLDnc1u-5xL-NvZd9k'} alt='foto experiencia'></img>
        </div>
        <div>
          <img className='fotitos' src={`https://drive.google.com/uc?export=view&id=1GkpxAPsr7GxltrpcpM0pTcGer9UyFDn1`} alt='foto experiencia'></img>
        </div>
        <div>
          <img className='fotitos' src={`https://drive.google.com/uc?export=view&id=1o1E8R0U0halHXME-PYK30Ov_mBJjR81o`} alt='foto experiencia'></img>
        </div>
        <div>
          <img className='fotitos' src={`https://drive.google.com/uc?export=view&id=1QnXvLXZq2-SDT5BD56b0KABOVtQsldpv`} alt='foto experiencia'></img>
        </div>
        </Slider>
  )
}
const CarouselSlickWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <ErrorBoundary fallback="CaruselSlick is failing">
      <CarouselSlick />
    </ErrorBoundary>
  </Suspense>

export default CarouselSlickWrapper
