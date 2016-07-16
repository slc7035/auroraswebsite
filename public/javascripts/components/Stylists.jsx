import React from 'react';
import '../../stylesheets/stylists.scss';
const DEFAULT_IMG = '../../images/default-stylist.jpg';

export default class Stylists extends React.Component {
  state = {
    stylists: JSON.parse(document.getElementById('stylistsJSON').value)
  };
  render() {
    let stylists = [];

    for (let i = 0; i < this.state.stylists.length; ++i) {
      let stylist = this.state.stylists[i];

      stylists.push(
        <div className='stylist' key={stylist.name}>
					<div className='name'>{stylist.name}</div>
				<img className='stylist-img' src={`../../images/${stylist.name.toLowerCase()}.jpg`} onError={(e) => {e.target.src=DEFAULT_IMG}}></img>
					<div className='bio'>{stylist.bio}</div>
        </div>
      );
    }

    return (
      <div className='page-content stylists'>
				<div className='title'>Meet the Stylists</div>
				<div className='stylists-container'>
        	{stylists}
				</div>
      </div>
    );
  }
}
