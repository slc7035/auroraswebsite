import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import '../../stylesheets/home.scss';

export default class Home extends React.Component {
  render() {
    let images = [
      {
        original: '../../images/salon_inside_1.jpg'
      },
      {
        original: '../../images/salon_inside_2.jpg'
      },
      {
        original: '../../images/salon_inside_3.jpg'
      }
    ];

    return (
      <div className='home'>
        <div className='content__row carousel__row'>
          <ImageGallery 
            items={images}
            slideInterval={2000}
            showThumbnails={false}
            showPlayButton={true}
            autoPlay={false}
            lazyLoad={true}>
          </ImageGallery>
        </div>
        <div className='content__row description__row'>
          <div className='text description'>Aurora's Barber and Beauty Shop is a full fledged hair and nail salon featuring a master barber, and diverse team to give you the best salon experience!</div>
        </div>
      </div>
    );
  }
}
