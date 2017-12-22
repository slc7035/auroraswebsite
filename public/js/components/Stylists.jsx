import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../stylesheets/stylists.scss';
const DEFAULT_IMG = '../../images/default-stylist.jpg';

class Stylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBio: false
    }
  }

  render() {
    let bioClasses = ['bio'];

    return (
      <div className='stylist' onMouseEnter={() => this.toggleBio(true)} onMouseLeave={() => this.toggleBio(false)} onClick={() => this.state.showBio ? this.toggleBio(false) : this.toggleBio(true)}>
        <div className='stylist-info'>
          <div className='name'>{this.props.stylist.name}</div>
          <img className='stylist-img' src={`../../images/${this.props.stylist.name.toLowerCase()}.jpg`} onError={(e) => { e.target.src = DEFAULT_IMG } }></img>
        </div>
        {/*<ReactCSSTransitionGroup 
          transitionName="bio-transition" 
          transitionEnterTimeout={500} 
          transitionLeaveTimeout={500}
          component='div'
          className='bio-transition'>
          {this.state.showBio ?
            <div className={bioClasses.join(' ')}>
              <div className='bio__text'>{this.props.stylist.bio}</div>
            </div>
            :
            null
          }
        </ReactCSSTransitionGroup>*/}
      </div>
    );
  }

  toggleBio = (show) => {
    this.setState({
      showBio: show
    });
  }

}

export default class Stylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stylists: JSON.parse(document.getElementById('stylistsJSON').value)
    };
  }

  render() {
    return (
      <div className='page-content stylists'>
        <div className='title'>Meet the Stylists</div>
        <div className='stylists-container'>
          {this.state.stylists.map(stylist => {
            return <Stylist stylist={stylist} key={stylist.name}/>;
          })}
        </div>
      </div>
    );
  }
}
