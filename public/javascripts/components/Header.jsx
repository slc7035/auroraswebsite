import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import { Link } from 'react-router'
import '../../stylesheets/header.scss';

export default class Header extends React.Component {
	isMobile() {
		return {
	    Android: () => navigator.userAgent.match(/Android/i),
	  	BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
	    iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
	    Opera: () => navigator.userAgent.match(/Opera Mini/i),
	    Windows: () => navigator.userAgent.match(/IEMobile/i),
	    any: () => this.isMobile.Android() || this.isMobile.BlackBerry() || this.isMobile.iOS() || this.isMobile.Opera() || this.isMobile.Windows()
		};
	}

	constructor(props) {
		super(props);
		this.isMobile = ::this.isMobile();
		this.state = {isMobile: this.isMobile.any()};
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
              <i className='header__item fa fa-scissors'></i>
							<div className='header__logo'>Aurora's Barber and Beauty Shop</div>
						</div>
						<div className='header__section'>
							{links}
						</div>
					</div>
			);
		}

    return (
			<div className='header'>
				{header}
			</div>
    );
  }
}
