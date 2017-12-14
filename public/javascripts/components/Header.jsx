import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router'
import '../../stylesheets/header.scss';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: this.isMobile().any()
    };
  }

  render() {
    let header;
    let links = [
      <Link id='home' key='home' className='header__item' activeClassName='is-selected' to='/'>Home</Link>,
      <Link id='services' key='services' className='header__item' activeClassName='is-selected' to='/services'>Services</Link>,
      <Link id='stylists' key='stylists' className='header__item' activeClassName='is-selected' to='/stylists'>Stylists</Link>
    ];

    if (this.state.isMobile) {
      header = (
        <div>
          <div className='header__mobile'>
            <a id='Setmore_button_iframe' href='https://my.setmore.com/shortBookingPage/047a7c9e-6675-4dfb-bce8-445458e61280'>
              Book an appointment!
						</a>
            <div className='header__logo'>Auroras Barber and Beauty Shop</div>
          </div>
          <Menu right id='menu' customBurgerIcon={<i id='bm-icon'></i>}>
            {links}
          </Menu>
        </div>
      );
    } else {
      header = (
        <div className='header__desktop'>
          <div className='header__section'>
            <i className='fa fa-scissors fa-lg'></i>
            <div className='header__logo'>Aurora's Barber and Beauty Shop</div>
          </div>
          <div className='header__section'>
            {links}
            <a id='Setmore_button_iframe' href='https://my.setmore.com/shortBookingPage/047a7c9e-6675-4dfb-bce8-445458e61280'>
              Book Online
              </a>
          </div>
        </div>
      );
    }

    // Header for social media icons
    let smHeader = (
      <div className='header__sm'>
        <div className='header__section'>
          <i className='fa fa-map-marker'></i>
          <a
            className='header__text'
            target='_blank'
            href='https://www.google.com/maps/place/Auroras+Barber+and+Beauty+Shop/@42.9739765,-77.378867,17z/data=!3m1!4b1!4m5!3m4!1s0x89d12fd50b94d911:0x23e4773aa218c331!8m2!3d42.9739726!4d-77.3766783'>
            150 Phoenix Mills Plaza Victor, New York 14564
            </a>
        </div>
        <div className='header__section'>
          <a className='header__sm-icon' target='_blank' href='https://www.facebook.com/awing67/?hc_ref=SEARCH&fref=nf'><i className='fa fa-facebook fa-lg'></i></a>
          <a className='header__sm-icon'><i className='fa fa-twitter fa-lg'></i></a>
          <a className='header__sm-icon'><i className='fa fa-pinterest-p fa-lg'></i></a>
          <a className='header__sm-icon'><i className='fa fa-instagram fa-lg'></i></a>
        </div>
      </div>
    );

    return (
      <div className='header'>
        {smHeader}
        {header}
      </div>
    );
  }

  isMobile = () => {
    return {
      Android: () => navigator.userAgent.match(/Android/i),
      BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
      iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
      Opera: () => navigator.userAgent.match(/Opera Mini/i),
      Windows: () => navigator.userAgent.match(/IEMobile/i),
      any: () => this.isMobile().Android() || this.isMobile().BlackBerry() || this.isMobile().iOS() || this.isMobile().Opera() || this.isMobile().Windows()
    };
  }
}
