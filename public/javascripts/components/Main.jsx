'use strict';
import styles from '../../stylesheets/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Home from './Home.jsx';
import Services from './Services.jsx';
import Staff from './Staff.jsx';
import About from './About.jsx';

class Main extends React.Component {
  state = {
    context: 'home'
  };
  render() {

    let pageContent;

    switch (this.state.context) {
      case 'home':
        pageContent = <Home/>;
        break;
      case 'services':
        pageContent = <Services/>;
        break;
      case 'stylists':
        pageContent = <Staff/>;
        break;
      case 'about':
        pageContent = <About/>;
        break;
    }

    return (
      <div>
        <Header click={this._changeContext} tabs={['home', 'services', 'stylists', 'about']} selected={this.state.context}/>
        <div className='appointment-btn-border'></div>
        <div className='appointment-btn'>
          <label htmlFor="appointmentIcon">Schedule appointment</label>
          <a id='Setmore_button_iframe'href='https://my.setmore.com/shortBookingPage/047a7c9e-6675-4dfb-bce8-445458e61280'>
            <i id="appointmentIcon" className='fa fa-calendar-plus-o' title='Schedule an appointment'></i>
          </a>
        </div>
        {pageContent}
      </div>
    );
  }
  _changeContext = (context) => {
    this.setState({context: context});
  }
}

ReactDOM.render(
  <Main/>, document.getElementById('mainContent'));
