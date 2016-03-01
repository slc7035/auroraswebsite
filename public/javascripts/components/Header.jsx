import React from 'react';
import '../../stylesheets/header.scss';

export default class Header extends React.Component {
  static propTypes = {
    click: React.PropTypes.func,
    tabs: React.PropTypes.array,
    selected: React.PropTypes.string
  };
  render() {
    let headerItems = [];    
    for (let tab of this.props.tabs) {
      headerItems.push(<div className={'header-item' + (this.props.selected === tab ? ' selected' : '')} data-header-type={tab} key={tab} onClick={this._tabClick}>{tab[0].toUpperCase() + tab.slice(1)}</div>);
    }

    return (
      <div className='header'>
        <div className='header-logo'>Auroras Barber and Beauty Shop</div>
        {headerItems}
      </div>
    );
  }
  _tabClick = (e) => {
    this.props.click(e.target.attributes['data-header-type'].value);
  }
}
