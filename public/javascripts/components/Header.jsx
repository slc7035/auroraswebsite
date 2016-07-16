import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import { Link } from 'react-router'
import '../../stylesheets/header.scss';

export default class Header extends React.Component {
	componentDidMount() {
		var el = document.getElementById('bm-icon');
		if (el.classList) {
			el.classList.add('fa');
			el.classList.add('fa-bars');
		}
		else
			el.className += ' fa fa-bars';
	}
	//<Link id="about" className="menu-item" activeClassName="active" to='/about'>About</Link>

  render() {
    return (
      <div>
        <div className='header'>
					<a id='Setmore_button_iframe'href='https://my.setmore.com/shortBookingPage/047a7c9e-6675-4dfb-bce8-445458e61280'>
						Book an appointment!
					</a>
          <div className='header-logo'>Auroras Barber and Beauty Shop</div>
        </div>
				<Menu right id="menu" customBurgerIcon={<i id="bm-icon"></i>}>
					<Link id="home" className="menu-item" activeClassName="active" to='/'>Home</Link>
					<Link id="services" className="menu-item" activeClassName="active" to='/services'>Services</Link>
					<Link id="stylists" className="menu-item" activeClassName="active" to='/stylists'>Stylists</Link>
				</Menu>
      </div>
    );
  }
}
